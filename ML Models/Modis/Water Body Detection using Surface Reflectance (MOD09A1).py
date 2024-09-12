import ee
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Initialize Earth Engine
try:
    ee.Initialize(project='ee-prakharagra10')
    print("Initialized successfully with the specified project.")
except ee.EEException as e:
    print(f"Initialization error: {e}")

# Define the region of interest (customize with your area coordinates)
geometry = ee.Geometry.Rectangle([74.4, 31.4, 78.0, 33.0])

# Load MODIS Surface Reflectance dataset
surface_reflectance = ee.ImageCollection('MODIS/006/MOD09A1') \
                       .filterDate('2023-01-01', '2023-12-31') \
                       .select('sur_refl_b01')

# Reduce the dataset to mean reflectance value
mean_reflectance = surface_reflectance.mean().reduceRegion(
    reducer=ee.Reducer.mean(),
    geometry=geometry,
    scale=1000
)

# Get reflectance value
reflectance_value = mean_reflectance.get('sur_refl_b01').getInfo()
print(f"Reflectance Value: {reflectance_value}")

# Create synthetic water detection features (e.g., reflectance, precipitation)
# Generate random features (e.g., reflectance, precipitation, temperature)
np.random.seed(42)  # For reproducibility
features = np.random.rand(100, 3)

# Generate labels: Assume reflectance value > 0.2 indicates water (label = 1), else non-water (label = 0)
# Add some noise to simulate real-world variability
labels = (reflectance_value + np.random.randn(100) * 0.05 > 0.2).astype(int)

# Ensure both classes (0 and 1) are present in the labels
if len(np.unique(labels)) < 2:
    # If only one class is present, generate some samples manually for demonstration
    labels[:50] = 0  # Force half of the data to be labeled as non-water (0)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, random_state=42)

# Logistic Regression model
lr_model = LogisticRegression()
lr_model.fit(X_train, y_train)

# Predictions
y_pred = lr_model.predict(X_test)

# Plotting the results
plt.scatter(range(len(y_test)), y_test, color='blue', label='Actual (Water/Non-Water)')
plt.plot(range(len(y_pred)), y_pred, color='red', label='Predicted (Water/Non-Water)')
plt.xlabel('Samples')
plt.ylabel('Water/Non-Water')
plt.title('Water Detection using Logistic Regression')
plt.legend()
plt.show()

# User input section for prediction
print("\nEnter values for reflectance, precipitation, and temperature to predict water body:")
reflectance_input = float(input("Reflectance (e.g., 0.1 to 0.5): "))
precipitation_input = float(input("Precipitation (e.g., 0 to 1): "))
temperature_input = float(input("Temperature (e.g., 0 to 1): "))

# Predict water/non-water based on user input
user_input = np.array([[reflectance_input, precipitation_input, temperature_input]])
prediction = lr_model.predict(user_input)

if prediction[0] == 1:
    print("Predicted: Water detected in the area.")
else:
    print("Predicted: No water detected in the area.")
