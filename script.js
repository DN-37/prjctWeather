const link = "http://api.weatherstack.com/current?access_key=2a1bdddf9a990df9d9ea6738a7e112aa";

const fetchData = async () => {
    try {
        const result = await fetch(`${link}&query=London`);
        const data = await result.json();

        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

fetchData();