/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=b1dc550ec354294d8b0b2c945b46a657&units=metric";

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

// Add Event Listener to the generate button and call the general function
document.getElementById("generate").addEventListener("click", performAction);

// The General Function
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feelingsVal = document.getElementById("feelings").value;

  if (!zipCode) {
    alert("Please Enter a valid zip-code");
  } else {
    getTemp(baseURL + zipCode + apiKey).then((data) => {
      postData("/addData", {
        temp: data.main.temp,
        date: newDate,
        content: feelingsVal,
      });
      updateUI();
    });
  }
}

// Contact with the api
const getTemp = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    const temp = data.main.temp;
    console.log(temp);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Post Data Function
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", 
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};


// Update UI Function
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `temperature: ${allData.temp}`;
    document.getElementById("content").innerHTML = `You feel: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};