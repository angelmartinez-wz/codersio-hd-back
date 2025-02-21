import { Page, APIRequestContext, expect } from '@playwright/test'
import testData from '../test-data/testData.json'

export class GraphQueries {
    page: Page
    request: APIRequestContext
    token: string | null = null

    constructor(request: APIRequestContext){
        this.request = request
    }

    async generateToken() {
        const response = await this.request.post(
            testData.generateTokenUrl,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: testData.email,
                    password: testData.password
                },
            }
        )

        if (response.status() === 200) {
            const body = await response.json()
            this.token = body.token
        } else {
            console.error('Login failed with status:', response.status())
        }
    }

    async getUserByEmail() {
        if (!this.token) {
            console.error('Token is not available')
            return
        }

        const response = await this.request.post(
            testData.apiUrl,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`,
            },
            data: {
              query: `
                {
                    userByEmail {
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
                        image
                      }
                      appointments {
                        id
                        diagnosis
                        date
                        time
                        status
                        errors {
                          id
                          code
                          fault
                          severity
                        }
                      }
                      dealership {
                        id
                        name
                        direction
                        phone
                        image
                        distance
                      }
                    }
                  }
              `
            },
          }
        )
        if (response.status() === 200) {
            const body = await response.json()
            const user = body.data.userByEmail

            expect(user.email).toBe(testData.email)
            expect(user.membership).toBeTruthy()

            const appointment = user.appointments[0]
            expect(appointment.status).toBe('Not Required')
            expect(appointment.errors).toHaveLength(0)
        } else {
            console.error('Request failed with status:', response.status())
        }
      }

      async UpdateAppointment() {
        if (!this.token) {
            console.error('Token is not available')
            return
        }

        const variables = {
            input: {
                date: "02-20-25",
                time: "12:30 PM",
                phone: "5570747295"
            }
        }
    
        const response = await this.request.post(
            testData.apiUrl,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                data: {
                    query: `
                    mutation($input: UpdateAppointmentInput!) {
                      updateAppointment(input: $input) {
                        id
                        diagnosis
                        date
                        time
                        status
                        phone
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
                  `,
                    variables: variables
                },
            }
        )
    
        if (response.status() === 200) {
            const body = await response.json()
            expect(body.data.updateAppointment.status).toBe('Scheduled')
        } else {
            console.error('Request failed with status:', response.status())
        }
    }
    

    async randomErrors() {
        if (!this.token) {
            console.error('Token is not available')
            return
        }

        const response = await this.request.post(
            testData.apiUrl,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`,
            },
            data: {
              query: `
                mutation {
                  randomErrors {
                    code
                    fault
                    severity
                  }
                }
              `
            },
          }
        )
        if (response.status() === 200) {
            const body = await response.json()

            expect(body.data.randomErrors).toBeDefined()
            expect(body.data.randomErrors.length).toBeGreaterThan(0)

            body.data.randomErrors.forEach((error: any) => {
                expect(error).toHaveProperty('code')
                expect(error).toHaveProperty('fault')
                expect(error).toHaveProperty('severity')
            })
        } else {
            console.error('Request failed with status:', response.status())
        }
      }

      async deleteErrors() {
        if (!this.token) {
            console.error('Token is not available')
            return
        }

        const response = await this.request.post(
            testData.apiUrl,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
            },
            data: {
              query: `
                mutation {
                    deleteErrors
                }
              `
            },
          }
        )
        if (response.status() === 200) {
            const body = await response.json()

            expect(body.data.deleteErrors).toBeDefined()
            expect(body.data.deleteErrors).toBe(true)
        } else {
            console.error('Request failed with status:', response.status())
        }
      }
}