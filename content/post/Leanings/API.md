+++
title = 'API'
date = 2024-06-11T08:16:22+05:30
tags = ['work']
categories = ['API','endPoints']
+++


when we have an API url like - `
https://qa2-r21.np.cwow.gcp.davita.com/zuul/cwow-encounter-lab-fulfillment/v4/lab-test-microbiology-result-details/1889097?fromDate=2024-03-05T00:00:00-05:00&toDate=2024-08-07T00:00:00-04:00`
Anything after the `?` is Request Param.

We set in this way.

```java
@GetMapping(value = "v4/lab-test-result-details/{mpi}")
public ResponseEntity<List<SpannerLabTestResultDto>> getByMpi(
    @Parameter(name = "mpi", required = true) @Valid @NotNull @PathVariable String mpi,
    @Parameter(name = "PreCwowResult ", required = false) @RequestParam(name = "isPreCwowResult", required = false) Boolean isPreCwowResult,
    @RequestHeader(value = "facilityTimeZone", required = true) String facilityTimeZone) {
		return ResponseEntity.ok(labTestResultDetailService.getLabResults(mpi, facilityTimeZone, isPreCwowResult));
}
```

### Going to a specific line in VSCode.

CTRL + P - Will open the command palette.
Then write `:lineNumber` it will show that line number.
Other way.
CTRL + G - Then write the line number it will come to the line Number.

### Calling another microservice.

Say in the previous example we need to call the different microservice `denodo` then in the application YML file we need to set the denodo url. `https://qa2-r21.np.cwow.gcp.davita.com/zuul/denodogcp/rest_labtestresults_by_testcode_v2/views/i_labtestresults_by_testcode_v2?startDate=20240305&masterPatientIdentifier=1889097&endDate=20240807` in more generic form.

```yml
denodo:
ktvviewurl: ${dva.cwow.edge}/denodogcp/rs_ktvcalculationlabrslts_${cwow.release.number}/views/i_ktvcalculationlabrslts_${cwow.release.number}?drawdate={drawdate_p}&facilitynumber={p_facilitynumber}&masterpatientidentifier={p_masterpatientidentifier}&requisitionnumber={requisitionnumber_p}
```

The values are based on the parameter that we are setting in the params. `p_masterpatientidentifier`

When calling the method and the url link of the API we need to set the params first. We need to set the param of only those which are there in the api url of denodo.
Example.

```java
private Map<String, Object> buildParams(CalculateLabResultsInputDto labCalculationPayLoadDTO,
			ZonedDateTime drawDate) {
		Map<String, Object> params = new HashMap<>();
		params.put("drawdate_p", drawDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
		params.put("p_facilitynumber", labCalculationPayLoadDTO.getRequestingFacilityNumber());
		params.put("p_masterpatientidentifier", labCalculationPayLoadDTO.getMasterPatientIdentifier());
		params.put("requisitionnumber_p", StringUtils.normalizeSpace(labCalculationPayLoadDTO.getRequisitionNumber()));
		return params;
	}
```
