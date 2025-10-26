# Device monitoring service

## Prerequisites
- Docker

## Setup

Simply run:
```
docker compose up [--force-recreate]
```

This will:
1. Start a postgres database server
2. Start a db client called Adminer accessible at http://localhost:8080
3. Launch a device simulator - A simple json server having GET end-points defined in `services/database/db.json` (each key of the json object is a GET endpoint on device server)
4. Create a database with the specified schema

## Interpretation of the task

### Goals of the service
Create a service that will:
1. Periodically check the health of a list of devices and store the results in a DB
2. The device list will have, among other things, a health check endpoint which will expose some of its capabilities like if it supports gRPC protocol. If so, use gRPC to fetch the diagnostics data
3. The service should make a REST call to the new device's health endpoint and store the capability result in the device's record in the DB. For all subsequent calls, the service should use the device info stored in the DB to determine if it should use REST or gRPC in order to fetch diagnostics data
4. Create a REST end-point that will retrieve the latest status of all devices
5. Store device diagnostics in the DB
6. Implement retry mechanism
7. Checksum - The `/diagnostics` endpoint for each device should return a checksum of the diagnostics data. The monitorning service should generate a new checksum of the received diagnostics data (either based on the device's `checksum_algorithm` specified in the DB or via an external checksum generator). The newly generated checksum should match the one received from the API. If there is a mismatch, log the error

### Non-functional requirements
1. Create mock network devices - these can be express apps with endpoints like /live, /diagnostics etc. Let some support gRPC and some REST. Have some devices respond slowly to mimic slow network
2. Create a docker container and use docker compose to run the main service and device services with a single command
3. Include a postgres container 
4. Cron job for periodical liveness check of the devices

## DB Schema

### Devices Table
- id
- name
- capabilities:  [gRPC, REST] etc
- url
- checksum_algorithm //md5, sha256
- hasExternalChecksum
- checksum_generator_id references "Checksum Generators" (id)

### Device Status
- id
- device_id
- HW version
- SW version
- FM version
- status
- checksum
- created_date

### Checksum Generators
- id
- name

## ToDo
1. Create a Node.js service that will:
    - Expose a `GET /monitor-devices` REST endpoint to perform the liveness check of all the devices by invoking their `/diagnostics` endpoint. If the device capabilities are not available, it should first invoke the `/healthcheck` endpoint and use the approapriate protocol available in the capabilities of the device (gRPC or REST). Store the capabalities in the DB. It should store the response in the databse
    - Expose a `/diagnostics` REST endpoint that will return the last successful result of the devices' liveness check

2. Create a cron job that will invoke the `/monitor-devices` endpoint at specified interval
