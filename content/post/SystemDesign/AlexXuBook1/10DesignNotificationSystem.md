+++
title = 'Design Notification System.'
date = 2025-07-28T10:07:46+05:30
url= "/post/systemdesign/AlexXuBook1/DesignNotificationSystem"
tags = ['interview question','system design', "systemDesignAlexXuBook1"]
+++
A notification is more than mobile push notification. There are 3 types of notification format - SMS, mobile push, Email. Notifications are important because they helps us to keep updated on the latest information. It can be a push notification about the favourite movie on Netflix and email about a discount on a new product or a message about online shopping payment confirmation.

### Understand the problem statement.

The design will be open ended and ambiguous get all the question to structure the interview.

Type of notification the system supports - Push, SMS and Email.

Real time system?

It is a soft real time system. We want user to get the notification fasts. When there is high workload then a bit delay is acceptable.

Supported device - ios, android, laptop.

What triggers the notification?

Notifications can be triggered by client application. They can also be scheduled on the server side.

Will users be able to opt out?

Yes user opt out will not receives any notifications.

How many notifications are send out each day?

10 million mobile push notification, 1 million SMS and 5 million emails.

### High level design.

It is structured - Different types of notification, contact info gathering flow, notification sending or receiving flow.

***Different types of notifications.***

**iOS Push Notification.**

They need 3 components to send an iOS push notification.

**Provider -** Provider builds and sends notification requests to Apple Push Notification Service APNs. To construct a push notification provider provides the following data - **Device Token -** UUID used for sending push notification. **Payload -** JSON dictionarycontains the notification payload.

```json
{
	"aps":{
			"alert":{
					"title":"Game Request",
					"body":"Bob wanst to play chess",
					"action-loc-key":"PLAY"
			},
			"badge":5
		}
}
```

**APN -** The remote servcie provided by Apple to propagate push notifications to iOS devices.

**iOS Device -** The client which receives the push notification.

**Android Push Notification.**

It is the same flow and instead of APNs, Firebase Cloud Messaging FCM is commonly used to send push notifications to android devices.

**SMS Message.**

In SMS message third party SMS services like Twilio, Nexmo are used. They are commercial service.

**Email.**

Companies can set up their own email servers and many use commercial email service like Sendgrid, Mailchimp as they has better delivery rate and data analytics.
{{<figure src="/images/SystemDesign/DesignExample/NotificationSystem/NotificationService.png" alt="User Logout." caption="Notification Service.">}}

***Contact Info Gathering Flow.***

To send notification - gather mobile device tokens, phone numbers, email address. User install the app or sign ups for the first time API servers collect user contact info and store it in the db.

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/ContactInfoGatheringFlow.png" alt="User Logout." caption="Contact Info Gathering Flow.">}}

The db table to store the contact info. User details are stored in the User table and the device information will be stored in the device table.

A user can have multiple devices indicating the push can be send to all the devices.

```sql
-- Create the 'user' table
CREATE TABLE user (
    user_id BIGINT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    country_code INTEGER,
    phone_number INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'device' table
CREATE TABLE device (
    id BIGINT PRIMARY KEY,
    device_token VARCHAR(255) NOT NULL,
    user_id BIGINT,
    last_logged_in_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    -- user is the name of the table. The user_id in the device table must match a user_id that already exists in the user table.
);

```

```sql
@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String email;
    private Integer countryCode;
    private Integer phoneNumber;
    private Timestamp createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Device> devices = new ArrayList<>();
}

@Entity
@Data
@Table(name = "device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceToken;
    private Timestamp lastLoggedInAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

```

***Notification Sending/receiving flow.***

The initial design then optimization. Initial can be without a cache or message queue and using single notification server. Discuss the happy path for lesser number of people.

**Service 1 to N** - A service can be microservice, cron job, distributed system that triggers notification sending events. Biling service sends email to remind customers of the due payment. Shopping website tells customer their package will be delivered tomorrow via SMS message.

**Notification System** - The notification system is the centrepiece of sending or receiving notifications Starting with simple and one notification server Providing Apis for services one to n and builds notification payload for 3rd party services.

The notification servers provide the following functionalities.

It provides APIs for services to send notifications. Those APIs are then accessible internally by verified clients to prevent spam.

Carry out basic validation to verify emails phone numbers and query database or cash to fetch data needed to render notification.

Put notification data to message queue for parallel processing. Example of the api to send an email.

`POST **https://api.example.com/v/sms/send**`

Request Body

```sql
{
		"to":[
				{
					"user_id":123456
				}
		],
		"from":{
				"email":"address@email.com"
		},
		"subject":"Hello World",
		"content":[
				{
					"type":"text/plain",
					"value":"Hello World"
				}
		]
}
```

Cache - User info, device info, notification templates are cached.

Db - Store data about user, notification, settings.

Message Queue - It removes dependencies between components. It act as buffer when high volume notification are to be sent. Each notification type is assigned with a distinct message queue so an outage in one thord patu service will not affect other notification type.

Worker - Workers are list of servers that pull notification events from message queues and send them to the third party service.

**Third party services -** They are responsible to deliver notificarion to the users. When integrating a third party services we need to pay extra attention to extensibility.

Good ectensibility means a flexible system that can easily plugging and unpluging of a third-party service.

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/NewsFeedBuilding.png" alt="User Logout." caption="User Logout.">}}

A service calls API provided by notification server to send notification.  Notification server fetch metadata such as user info, device token and notification setting from the cache or database. A notification event is sent to the queue for processing. Workers pulls the notification events from the queue and send to the third party services which sends notification to the user device.

### Design Deep Dive.

The main focus on the deep dive will be in the reliability, additional component and consideration like notification template, notification settings, rate limiting, retry mechanism, security in push notification, monitor queued notification and event tracking.

***Reliability.***

**How to prevent data loss?**

It cannot lose data. It can delayed or re-ordered but never lost. To satisfy the requirement the notification system persists notification data in a database and implement a retry mechanism. The notification log database is included for data persistence.

iOS, Android, SMS, Email - User receives notification on their device.

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/HighLevelDesign.png" alt="User Logout." caption="User Logout.">}}

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/Worker.png" alt="User Logout." caption="User Logout.">}}

**Will recipients receive a notification exactly once?**

Notification is delivered exactly once most of the time but the distributed nature can result is duplicate notifications. To reduce the duplication occurrence we introduce a dedupe mechanism and handle each failure case carefully.

The dedupe logic - When a notification event first arrived we see if this is seen before by checking Event id If seen before then discarded else we send out the notification.

https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/

***Additional Components and considerations.***

**Notification Template.**

A large notification system sends out millions of notification per day and they generally follow a similar format. Notification temperature introduced to avoid building every notification from scratch. The notification can be created by customising Parameters styling and tracking links.

Example.

BODY:
You dreamed of it. We dared it. [ITEM NAME] is back — only until [DATE].
CTA:
Order Now. Or, Save My [ITEM NAME]

The benefits of using notification templates include maintaining a consistent format, reducing the margin error, and saving time.

**Notification settings.**

Users get too many notifications and they get overwhelmed so many websites and app gives a fine grain control over notification settings. The information is stored in the notification settings table in the following field.

```sql
user_id bigInt
channel varchar # push notification email or SMS.
opt_in boolean # opt-i to receive notification
```

Prior to send a notification to the user we need to see if the user is opted-in to receive this type of notification.

**Rate Limiting.**

To avoid overwhelming users with two main notifications many tools put a limit on the number of notifications a user can receive.

**Retry mechanism.**

When a 3rd party fails to send a notification the notification will be added to the message queue for retrain. with the problem persist an alert will be sent out to the developer.

**Security in pushing notification.**

For iOS or Andriod apps there are appKey and appSecret yo secure push notification APIs. Only authentic editor verified client are allowed to send push notification using our APIs.

**Monitored queued notifications.**

A key metric to monitor Is the total number of queued notifications If the number is large the notification event are not processed fast enough by workers. To avoid delay in the notification delivery more workers are needed.

**Event tracking.**

Notification metrics, such as open rate, click rate, and engagement are important in understanding customer behaviors. Analytics service implements events tracking. Integration between the notification system and the analytics service is usually required.

{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/UpdatedDesign .png" alt="User Logout." caption="User Logout.">}}

The updated design is given.

New components are added to the previous high level design. the notification server are equipped with two more critical features authentication and rate limiting. we have added the retro mechanism to handle notification failure. Notification fail to send will be put back to the message queues and the worker will retry for a predefined number of times. Notification template provided for a consistent and efficient notification creation process. Finally a monitoring and tracking system are added for system health cheque and future improvements.


{{<figure src="/images/SystemDesign/DesignExample/ChatApplication/Design.png" alt="User Logout." caption="User Logout.">}}