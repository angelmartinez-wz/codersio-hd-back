# codersio-hd-back
Back-End for Harley Davidson Hackaton, owned by Coders.io team

## Prerequistes
- Node `v.20.x`
- Npm `9.x.x`

## Install
Run `npm i`


## Run
- Run `npm start`
- Open: `localhost:9000/graphql`

## Create Database
Run `npm run db`

## Login
```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": "angel@hd.com",
  "password": "angel123"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:9000/login", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```json
# Response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY01KcEw3YjQxM1oiLCJlbWFpbCI6ImFuZ2VsQGhkLmNvbSIsImlhdCI6MTczOTQ2OTgzM30.FkVsbqLvrIJwDS7v8bVjn26fz2OaiowsPWTSQ35Rco0"
}
```
## Authorization
Set `Authorization` header with value `Bearer {token}`

## Queries
### Get Users
```gql
query {
  users {
    id
    email
    name
    password
    phone
    membership
    motorcycle {
      id
      model
      color
      plate
      registration
    }
    appointments {
      id
      diagnosis
      date
      time
      status
    }
  }
}
```

### Get Motorcycles
```gql
query {
  motorcycles {
    id
    color
    model
    plate
    registration
    user {
      id
      name
      email
      phone
      password
      membership
    }
    appointments {
      id
    }
  }
}
```

### Get Dealerships
```gql
query {
 dealerships {
    id
    name
    direction
    phone
    image
    distance
  }
}
```

### Get Appointments
```gql
query {
  appointments {
    id
    date
    time
    status
    diagnosis
    alerts {
      id
      alertCode
      alertDescription
    }
    user {
      id
      phone
      membership
      email
      name
      motorcycle {
        id
        model
        color
        plate
        registration
      }
    }
  }
}
```

### Get Appointment
```gql
query($appointmentId: ID!) {
  appointment(id: $appointmentId) {
    id
    date
    time
    status
    diagnosis
    user {
      id
      phone
      membership
      email
      name
      motorcycle {
        id
        model
        color
        plate
        registration
      }
    }
  }
}
```

```gql
# Variables
{
  "appointmentId": "f3YzmnBZpK0o"
}
```

### Create Appointment
```gql
mutation($input: CreateAppointmentInput!) {
  createAppointment(input: $input) {
    id
    diagnosis
    date
    time
    status
    user {
     id
     name
     phone
     motorcycle {
      id
      color
      plate      
     } 
    }
  }
}
```

```gql
# Variables
{
  "input": {
    "diagnosis": "Injection Issue",
    "date": "26-02-05",
    "time": "12:00 PM"
  }
}
```

### Update Appointment
```gql
mutation($input: UpdateAppointmentInput!) {
  updateAppointment(input: $input) {
    id
    diagnosis
    date
    time
    status
    user {
     id
     name
     phone
     motorcycle {
      id
      color
      plate      
     } 
    }
  }
}
```

```gql
# Variables
{
  "input": {
    "id": "lX6qilju9NQA",
    "diagnosis": "Discharged Battery",
    "date": "26-12-05",
    "time": "12:30 PM"
  }
}
```

### Delete Appointment
```gql
mutation($input: DeleteAppointmentInput!) {
  deleteAppointment(input: $input) {
    id
    diagnosis
    date
    time
    status
    user {
     id
     name
     phone
     motorcycle {
      id
      color
      plate      
     } 
    }
  }
}
```

```gql
# Variables
{
  "input": {
    "id": "lX6qilju9NQA"
  }
}
```

### Get Alerts
```gql
query {
  alerts {
    id
    alertCode
    alertDescription
    appointment {
      id
      diagnosis
      date
      time
      user {
        id
        name
        motorcycle {
          id
          model
          plate
        }
      }
    }
  }
}
```

### Add Alerts
```gql
query {
  alerts {
    id
    alertCode
    alertDescription
    appointment {
      id
      diagnosis
      date
      time
      user {
        id
        name
        motorcycle {
          id
          model
          plate
        }
      }
    }
  }
}
```

```gql
# Variables
{
  "input": {
    "appointmentId": "f3YzmnBZpK0o",
    "alerts": [
      {
        "alertCode": "P0420",
        "alertDescription": "Idle Air Control Valve (IAC) Malfunction"
      },
      {
        "alertCode": "P0115",
        "alertDescription": "Engine Coolant Temperature Sensor Circuit Malfunction"
      }
    ]
  }
}
```

### Subscription Alerts
```gql
subscription {
  alertAdded {
    id
    alertCode
    alertDescription
    appointment {
      id
      user {
        email
      }
    }
  }
}
```

### Random Alerts
```gql
mutation {
  randomAlerts {
    alertCode
    alertDescription
    alertFault
    severity
  }
}
```
