import dayjs from 'dayjs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { serve } = require("@upstash/workflow/express")

import Subscription from '../models/subscription.model.js'

const REMINDERS = [7, 5, 2, 1]

export const setReminders = serve(async (context) => {
  try {
    const { subscriptionId } = context.requestPayload

    const subscription = await fetchSubscription(subscriptionId, context)

    if (!subscription || subscription.status !== "active") {
      console.log(`No active subscription found with ID: ${subscriptionId}`)
      return
    }

    const renewalDate = dayjs(subscription.renewalDate)

    if (renewalDate.isBefore(dayjs())) {
      console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`)
      return
    }

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'days')

      if (reminderDate.isAfter(dayjs())) {
        console.log(`Scheduling reminder: ${daysBefore} days before at ${reminderDate}`)

        // Sleep until the reminder date
        await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)

        // Trigger the reminder only after sleeping
        await triggerReminder(context, `Reminder ${daysBefore} days before`)
      }
    }
  } catch (error) {
    console.error(`Error in setReminders workflow: ${error.message}`)
  }
})

const fetchSubscription = async (subscriptionId, context) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email')
  })
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`)
  await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label) => {
  await context.run(label, () => {
    console.log(`Triggering ${label} reminder`)
  })
}
