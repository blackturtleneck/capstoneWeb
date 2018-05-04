import React from 'react';
import MultiSelectField from './MultiSelectField';
import './DatesSelection.css';
import AvailableTimes from 'react-available-times';

class DatesSelection extends React.Component {
    render() {
        return (
            <div className="right-side">
                <AvailableTimes
                    classname="scheduler"
                    weekStartsOn="monday"
                    calendars={[
                        {
                            id: 'me',
                            title: 'My Schedule',
                            foregroundColor: '#cd0ff',
                            backgroundColor: '#f0f0f0',
                            selected: true
                        },
                        {
                            id: 'date',
                            title: 'My dates cal',
                            foregroundColor: '#666',
                            backgroundColor: '#f3f3f3'
                        }
                    ]}
                    onChange={selections => {
                        selections.forEach(({ start, end }) => {
                            console.log('Start:', start, 'End:', end);
                        });
                    }}
                    onEventsRequested={({
                        calendarId,
                        start,
                        end,
                        callback
                    }) => {}}
                    height={600}
                    recurring={false}
                    availableDays={[
                        'monday',
                        'tuesday',
                        'wednesday',
                        'thursday',
                        'friday'
                    ]}
                    availableHourRange={{ start: 9, end: 19 }}
                />
                <MultiSelectField />
                <form>
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default DatesSelection;
