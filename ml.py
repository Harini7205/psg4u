import streamlit as st
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Load dataset
data = pd.read_csv('grades_dataset.csv')

# Simulated ML model: Linear Regression for predicting CA2 marks and semester grades
def predict_ca2_and_sem_grades(ca1_marks, current_cgpa, expected_cgpa):
    # Prepare training data
    X = data[['ca1']].values.reshape(-1, 1)  # Reshape for sklearn
    y_ca2 = data['ca2'].values
    y_semester = data['semester'].values

    # Initialize models
    model_ca2 = LinearRegression()
    model_semester = LinearRegression()

    # Train the models
    model_ca2.fit(X, y_ca2)
    model_semester.fit(X, y_semester)

    # Predict CA2 marks based on CA1 marks
    ca2_marks = model_ca2.predict(np.array(ca1_marks).reshape(-1, 1))
    semester_grades = model_semester.predict(np.array(ca1_marks).reshape(-1, 1))

    # Calculate the total marks needed to achieve expected CGPA
    total_marks_needed = expected_cgpa * len(ca1_marks) * 10  # Assume each subject is out of 100
    current_total_marks = current_cgpa * len(ca1_marks) * 10
    required_marks = total_marks_needed - current_total_marks

    # Adjust semester grades to ensure the expected CGPA is achieved
    for i in range(len(semester_grades)):
        total = ca2_marks[i] + semester_grades[i]
        if total < required_marks:
            additional_needed = required_marks - total
            semester_grades[i] += additional_needed / len(semester_grades)  # Distribute needed marks evenly

    # Clip the grades to ensure they are within valid ranges
    ca2_marks = np.clip(ca2_marks, 0, 50)  # CA2 marks should be out of 50
    semester_grades = np.clip(semester_grades, 0, 100)  # Semester grades should be out of 100

    return ca2_marks.tolist(), semester_grades.tolist()  # Return as lists

# Sidebar: Add title and user input for current and expected CGPA
st.sidebar.title("CGPA Prediction")
st.sidebar.image("apppsg/public/images/logo_psg4u.png")
st.sidebar.header("About")
st.sidebar.info("This model predicts CA2 marks and semester grades based on CA1 scores, current CGPA, and expected CGPA.")

# User Input: Current CGPA and Expected CGPA
current_cgpa = st.sidebar.slider('Enter your current CGPA:', 5.0, 10.0, 7.0, 0.1)
expected_cgpa = st.sidebar.slider('Enter your expected CGPA:', 5.0, 10.0, 8.0, 0.1)

# Main App Section
st.title("Predict Your Semester Performance")
st.markdown("This app predicts CA2 marks and semester grades based on your CA1 marks, current CGPA, and expected CGPA.")

# Subjects and CA1 Marks Input
st.subheader("Input your CA1 marks for the following subjects (out of 50):")

subjects = [
    {"subject_name": "Calculus", "credits": 4},
    {"subject_name": "Electronics", "credits": 3},
    {"subject_name": "Chemistry", "credits": 3},
    {"subject_name": "CT", "credits": 3},
    {"subject_name": "English", "credits": 3}
]

ca1_marks = []
for subject in subjects:
    mark = st.slider(f"{subject['subject_name']} (Credits: {subject['credits']})", 0, 50, 25, 1)
    ca1_marks.append(mark)

# Predict button
if st.button("Predict CA2 and Semester Grades"):
    ca2_marks, semester_grades = predict_ca2_and_sem_grades(ca1_marks, current_cgpa, expected_cgpa)

    # Display predictions using HTML and CSS
    st.subheader("Predicted CA2 Marks and Semester Grades:")
    html_content = "<div style='font-family: Poppins, sans-serif;'><ul style='list-style-type: none; padding: 0;'>"
    
    for i, subject in enumerate(subjects):
        html_content += f"<li style='margin: 10px 0;'><strong>{subject['subject_name']}:</strong><br/> CA2 = <span style='color: blue;'>{ca2_marks[i]:.1f}</span> , Semester Grade = <span style='color: green;'>{semester_grades[i]:.1f}</span></li>"

    html_content += "</ul></div>"
    
    # Render the HTML content
    st.markdown(html_content, unsafe_allow_html=True)

    # Calculate the total possible marks and achieved marks
    total_possible_marks = len(subjects) * (50 + 100)  # CA1 marks (0-50) + Semester grades (0-100)
    total_predicted_marks = np.array(ca2_marks) + np.array(semester_grades)
    achieved_marks = total_predicted_marks.sum()

# Calculate achieved CGPA based on total possible marks
    achieved_cgpa = (achieved_marks / total_possible_marks) * 10  # Scale to CGPA out of 10

    if achieved_cgpa >= expected_cgpa:
        st.success(f"Congratulations! Your predicted CGPA is **{achieved_cgpa:.2f}**, which meets your expected CGPA of **{expected_cgpa:.2f}**.")
    else:
        st.warning(f"Your predicted CGPA is **{achieved_cgpa:.2f}**, which may not be sufficient to achieve your expected CGPA of **{expected_cgpa:.2f}**. Consider improving in certain subjects.")

    # Beautification: Plot the predicted grades
    st.subheader("Visualize Predicted CA2 and Semester Grades")
    fig, ax = plt.subplots(figsize=(10, 6))  # Increase figure size

    # Set bar width and positions
    bar_width = 0.35
    index = np.arange(len(subjects))

    # Plot CA2 Marks
    bar1 = ax.bar(index, ca2_marks, bar_width, color='blue', label='CA2 Marks')

    # Plot Semester Grades, offset by bar width
    bar2 = ax.bar(index + bar_width, semester_grades, bar_width, color='green', label='Semester Grades', alpha=0.7)

    # Add data labels on top of bars
    for bar in bar1:
        yval = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, yval, f'{yval:.1f}', ha='center', va='bottom')

    for bar in bar2:
        yval = bar.get_height()
        ax.text(bar.get_x() + bar.get_width() / 2, yval, f'{yval:.1f}', ha='center', va='bottom')

    # Set x-ticks, labels, and title
    ax.set_xticks(index + bar_width / 2)
    ax.set_xticklabels([sub['subject_name'] for sub in subjects])
    ax.set_ylabel("Marks")
    ax.set_title("Predicted CA2 Marks and Semester Grades")
    ax.legend()

    # Add grid lines for better visibility
    ax.yaxis.grid(True)

    # Optionally, rotate x-tick labels if necessary
    plt.xticks(rotation=45)

    # Show the plot
    st.pyplot(fig)