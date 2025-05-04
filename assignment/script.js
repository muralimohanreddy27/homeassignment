const incidentList = document.getElementById('incidentList');
const severityFilter = document.getElementById('severityFilter');
const dateSort = document.getElementById('dateSort');
const incidentForm = document.getElementById('incidentForm');

let incidents = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

function renderIncidents() {
  incidentList.innerHTML = "";

  let filteredIncidents = [...incidents];

  const selectedSeverity = severityFilter.value;
  const selectedSort = dateSort.value;

  if (selectedSeverity !== "All") {
    filteredIncidents = filteredIncidents.filter(incident => incident.severity === selectedSeverity);
  }

  filteredIncidents.sort((a, b) => {
    if (selectedSort === "newest") {
      return new Date(b.reported_at) - new Date(a.reported_at);
    } else {
      return new Date(a.reported_at) - new Date(b.reported_at);
    }
  });

  filteredIncidents.forEach(incident => {
    const card = document.createElement('div');
    card.className = 'incident-card';

    card.innerHTML = `
      <div class="incident-header">
        <div>
          <div class="incident-title">${incident.title}</div>
          <div class="incident-meta">Severity: ${incident.severity} | Reported: ${new Date(incident.reported_at).toLocaleDateString()}</div>
        </div>
        <button class="view-details">View Details</button>
      </div>
      <div class="incident-description">${incident.description}</div>
    `;

    const viewDetailsButton = card.querySelector('.view-details');
    const descriptionDiv = card.querySelector('.incident-description');

    viewDetailsButton.addEventListener('click', () => {
      if (descriptionDiv.style.display === "block") {
        descriptionDiv.style.display = "none";
        viewDetailsButton.textContent = "View Details";
      } else {
        descriptionDiv.style.display = "block";
        viewDetailsButton.textContent = "Hide Details";
      }
    });

    incidentList.appendChild(card);
  });
}

severityFilter.addEventListener('change', renderIncidents);
dateSort.addEventListener('change', renderIncidents);

incidentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const severity = document.getElementById('severity').value;

  if (title && description && severity) {
    const newIncident = {
      id: incidents.length + 1,
      title,
      description,
      severity,
      reported_at: new Date().toISOString()
    };

    incidents.push(newIncident);
    renderIncidents();
    incidentForm.reset();
  } else {
    alert('Please fill all fields correctly.');
  }
});

renderIncidents();
