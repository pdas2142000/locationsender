export const AddLocation = async (locationData) => {
    try {
        const response = await fetch('https://codeofdolphins.com/cloud-kitchen/api/addLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(locationData),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            console.error('Error Response:', response);
            throw new Error('Failed to add location');
        }

        const responseData = await response.json();
        console.log('Response data:', responseData);

        return responseData;
    } catch (error) {
        console.error('Error in addLocation:', error);
        throw error;
    }
};
