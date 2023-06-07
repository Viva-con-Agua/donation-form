# base-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Tracking

### Payload
```
{
    "event": "gtm-trigger-" + action,
    "category": "DonationForm",
    "action": action,
    "name": name,
    "value": value
}
```

### Actions:

| action | description |
| --- | --- |
| click | button click |

### Names Action Value

| name | action | value |
| --- | --- | --- |
| StepOne Next donation-form | click | 0 |
| StepTwo Next donation-form | click | 0 |
| StepTree Donate donation-form | click | amount |
| StepFour Newsletter-Subscription donation-form | click | 0 |
| StepFour Feedback-Contact-Us donation-form | click | 0 |