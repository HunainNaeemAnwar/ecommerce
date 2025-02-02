export default function formatDate(apiDate: string): string {
    // Parse the API date into a Date object
    const date = new Date(apiDate);

    // Extract day, month, and year
    const day = date.getDate();
    const year = date.getFullYear();

    // Define an array for month names
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    // Get the full month name
    const month = months[date.getMonth()];

    // Return the formatted date
    return `${day}-${month}-${year}`;
}

// Example usage
const apiDate = "2020-08-12"; // Example API date
const formattedDate = formatDate(apiDate);

console.log(formattedDate); // Output: 12-August-2020
