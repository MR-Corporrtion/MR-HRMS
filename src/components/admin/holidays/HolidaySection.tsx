// pages/holidays.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiClient } from '../../../../config/route.config';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Initialize the localizer for Calendar
const localizer = momentLocalizer(moment);

const HolidaysPage: React.FC = () => {
    const [holidays, setHolidays] = useState<any[]>([]);
    const [holidayName, setHolidayName] = useState('');
    const [holidayDescription, setHolidayDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showBulkUpload, setShowBulkUpload] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
                const response = await apiClient.get('/holiday/get', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials:true
                });
                setHolidays(response.data.holiday);
            } catch (error) {
                setError('Failed to fetch holidays. Please try again.');
            }
        };

        fetchHolidays();
    }, [refreshKey]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
            await apiClient.post('/holiday/create', {
                holidayName,
                holidayDescription,
                date,
            }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials:true
            });

            refreshData();
            setShowAddForm(false);
            clearForm();
        } catch (error) {
            setError('Failed to submit the form. Please try again.');
        }
    };

    const handleBulkUpload = async () => {
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);

            const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
            await apiClient.post('/holiday/create-bulk', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            refreshData();
            setShowBulkUpload(false);
        } catch (error) {
            setError('Failed to upload holidays. Please try again.');
        }
    };

    const refreshData = () => {
        setRefreshKey((prev) => prev + 1);
    };

    const clearForm = () => {
        setHolidayName('');
        setHolidayDescription('');
        setDate('');
    };

    const events = holidays.map((holiday) => ({
        title: holiday.holidayName,
        start: new Date(holiday.holidayDate),
        end: new Date(holiday.holidayDate),
        allDay: true,
    }));

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Manage Holidays</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-blue-500 text-white p-2"
                >
                    {showAddForm ? 'Close Add Holiday' : 'Add Holiday'}
                </button>
                <button
                    onClick={() => setShowBulkUpload(!showBulkUpload)}
                    className="bg-green-500 text-white p-2"
                >
                    {showBulkUpload ? 'Close Bulk Upload' : 'Bulk Upload'}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                    <div>
                        <label className="block">Holiday Name</label>
                        <input
                            type="text"
                            value={holidayName}
                            onChange={(e) => setHolidayName(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Holiday Description</label>
                        <textarea
                            value={holidayDescription}
                            onChange={(e) => setHolidayDescription(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2">
                        Create Holiday
                    </button>
                </form>
            )}

            {showBulkUpload && (
                <div className="mb-4">
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="border p-2 w-full"
                    />
                    <button onClick={handleBulkUpload} className="bg-green-500 text-white p-2 mt-2">
                        Upload File
                    </button>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl mb-4">Holiday Calendar</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    views={['month', 'week', 'day']}
                />
            </div>
        </div>
    );
};

export default HolidaysPage;
