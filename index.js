const calendar = new VanillaCalendar({
    selector: "#myCalendar",
    onSelect: (data, elem) => {
        console.log(data);
    
    },
});