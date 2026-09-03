const API_URL = "https://room-type-prediction-1.onrender.com";

const form = document.getElementById("predictionForm");
const predictBtn = document.getElementById("predictBtn");

const loading = document.getElementById("loading");
const result = document.getElementById("result");
const errorBox = document.getElementById("errorBox");

const predictionElement = document.getElementById("prediction");
const probabilityContainer = document.getElementById("probabilityContainer");

form.addEventListener("submit", async function (event) {

event.preventDefault();

hideError();
result.classList.add("hidden");

const data = {
    latitude: Number(document.getElementById("latitude").value),
    longitude: Number(document.getElementById("longitude").value),
    price: Number( document.getElementById("price").value),
    minimum_nights: Number(document.getElementById("minimum_nights").value),
    number_of_reviews: Number(document.getElementById("number_of_reviews").value),
    reviews_per_month: Number(document.getElementById("reviews_per_month").value),
    calculated_host_listings_count: Number(document.getElementById("calculated_host_listings_count").value),
    availability_365: Number(document.getElementById("availability_365").value),
    neighbourhood_group:document.getElementById("neighbourhood_group").value.trim(),
    neighbourhood:document.getElementById("neighbourhood").value.trim()
};

if (data.latitude < -90 ||
    data.latitude > 90
) {
    showError("Latitude must be between -90 and 90.");
    return;
}

if (data.longitude < -180 ||
    data.longitude > 180
) {
    showError("Longitude must be between -180 and 180.");
    return;
}

if (data.price < 0) {
    showError("Price cannot be negative.");
    return;
}

if (data.minimum_nights < 1 ||
    data.minimum_nights > 365
) {
    showError("Minimum nights must be between 1 and 365.");
    return;
}

if (data.availability_365 < 0 ||
    data.availability_365 > 365
) {
    showError("Availability must be between 0 and 365.");
    return;
}

loading.classList.remove("hidden");
predictBtn.disabled = true;
predictBtn.textContent = "Predicting...";

try {
    const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    console.log("Response Status:", response.status);
    if (!response.ok) {
        let errorMessage = "Prediction failed.";
        try {
            const errorData = await response.json();
            console.log(
                "API Error Response:",
                errorData
            );
            if (errorData.detail) {
                errorMessage =
                    Array.isArray(errorData.detail)
                        ? errorData.detail
                            .map(error => error.msg)
                            .join(", ")
                        : errorData.detail;
            }

        } catch (error) {
            console.error(
                "Could not read API error:",
                error
            );
            errorMessage =
                `Prediction failed. Server returned ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log(
        "API Response:",
        responseData
    );

    // Display Prediction
    displayPrediction(responseData);

} catch (error) {
    console.error(
        "Actual Error:",
        error
    );
    showError(error.message);


} finally {
    loading.classList.add("hidden");
    predictBtn.disabled = false;
    predictBtn.textContent = "Predict";
}

});

function displayPrediction(data) {
const predictions =
    data.Predicted_room_type;

const probabilities =
    data.Probability;


if (!predictions ||
    predictions.length === 0
) {
    showError(
        "No prediction was returned by the API."
    );
    return;
}

const predictedRoom =
    predictions[0];

predictionElement.textContent =
    predictedRoom;

probabilityContainer.innerHTML = "";
if (probabilities &&probabilities.length > 0 &&Array.isArray(probabilities[0])
) {
    probabilities[0].forEach(
        (probability, index) => {

            const percentage =
                (probability * 100).toFixed(2);

            const item =
                document.createElement("div");

            item.className =
                "probability-item";

            item.innerHTML = `
                <div class="probability-label">
                    <span>
                        Class ${index + 1}
                    </span>
                    <span>
                        ${percentage}%
                    </span>
                </div>

                <div class="progress">
                    <div
                        class="progress-bar"
                        style="width: ${percentage}%"
                    ></div>
                </div>

            `;

            probabilityContainer.appendChild(
                item
            );
        }
    );
}

result.classList.remove("hidden");
result.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
}

function showError(message) {
errorBox.textContent =
    message;

errorBox.classList.remove(
    "hidden"
);

errorBox.scrollIntoView({
    behavior: "smooth",
    block: "center"
});
}

function hideError() {
errorBox.textContent = "";
errorBox.classList.add(
    "hidden"
);
}
