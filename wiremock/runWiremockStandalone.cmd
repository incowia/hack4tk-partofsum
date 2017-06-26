:: example of running standalone wiremock server
:: cd xpct/tests/methodtest/wiremock

IF EXIST "wiremock-standalone-2.6.0.jar" (echo "existing") ELSE (curl -H "Accept: application/zip" http://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-standalone/2.6.0/wiremock-standalone-2.6.0.jar -o wiremock-standalone-2.6.0.jar)




:: http://wiremock.org/docs/running-standalone/
:: run from xpct/tests/methodtest/wiremock/stubs directory or specify --root-dir
java -Xmx1024m -jar wiremock-standalone-2.6.0.jar  --verbose --root-dir=stubs

:: Test URL at: 
::  http://localhost:8080/tt/getCountries?xxx=yyy&blah=blah

:: see all mappings
:: http://localhost:8080/__admin/