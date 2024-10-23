export const getGreeting = () => {
    const currentHour = new Date().getHours()

    if (currentHour >= 0 && currentHour < 5) {
        return "Good night"
    } else if (currentHour < 12) {
        return "Good morning"
    } else if (currentHour < 18) {
        return "Good afternoon"
    } else {
        return "Good evening"
    }
}