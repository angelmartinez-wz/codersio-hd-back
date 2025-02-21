import { test, expect, request } from '@playwright/test';
import testData from '../test-data/testData.json'
import { GraphQueries } from '../queries/graphQueries'

test.describe('graphql Automation', () => {
  let graphQueries: GraphQueries

  test.beforeEach(async ({ request }) => {
    graphQueries = new GraphQueries(request)
    await graphQueries.generateToken()
  })

  test.only("E2E API - Schedule an Appointment", async ({ request }) => {
    await graphQueries.getUserByEmail()
    await graphQueries.randomErrors()
    await graphQueries.UpdateAppointment()
    await graphQueries.deleteErrors()
  });
})