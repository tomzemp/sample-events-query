import React, { useState } from 'react'
import { useAlert, useDataMutation } from '@dhis2/app-runtime'
import { Button, CalendarInput } from '@dhis2/ui'
import classes from './App.module.css'

const mutationQuery = {
    resource: 'tracker',
    type: 'create',
    data: (event) => ({
        events: [event],
    }),
    params: {
        async: false,
    },
}

const eventTemplate = {
    occurredAt: '2023-04-14',
    notes: [],
    program: 'lxAQ7Zs9VYR',
    programStage: 'dBwrot7S420',
    orgUnit: 'g8upMTyEZGZ',
    dataValues: [
        { dataElement: 'sWoqcoByYmD', value: 'false' },
        {
            dataElement: 'vANAXwtLwcT',
            value: '15',
        },
    ],
}

const MyApp = () => {
    const { show } = useAlert('Event successfully added!', {
        duration: 1000,
        success: true,
    })

    const [mutate, { error }] = useDataMutation(mutationQuery, {
        onComplete: () => {
            show()
        },
        onError: (e) => {
            console.error(e)
        },
    })

    const [date, setDate] = useState('2023-04-14')

    if (error) {
        return <span>Error...</span>
    }

    return (
        <div className={classes.container}>
            <h2>Add a random event</h2>
            <span>Program: Antenatal Care Visit</span>
            <span>Organisation unit: Njandama MCHP</span>
            <span>Hemoglobin: 15</span>
            <span>Smoking: false</span>
            <div className={classes.calendarContainer}>
                <CalendarInput
                    calendar="gregory"
                    label="date for event"
                    onDateSelect={(calendarSelection) => {
                        setDate(calendarSelection.calendarDateString)
                    }}
                    date={date}
                />
            </div>
            <Button
                primary
                onClick={() => {
                    const currentEvent = { ...eventTemplate, occurredAt: date }
                    mutate(currentEvent)
                }}
            >
                Add an event
            </Button>
        </div>
    )
}

export default MyApp
