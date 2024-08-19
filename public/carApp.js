document.addEventListener('alpine:init', () => {
  Alpine.data('carApp', () => ({
    cars: [],
    newCar: { color: '', make: '', model: '', reg_number: '' },
    isAdding: false,
    isEditing: false,
    currentCar: {},
    apiUrl: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
        ? 'http://localhost:3000' 
        : 'https://monica-car-inventory.vercel.app/api',

    fetchCars() {
      axios.get(`${this.apiUrl}/cars`)
        .then(response => {
          this.cars = response.data;
          this.renderChart();
        })
        .catch(error => console.error("Error fetching cars!", error));
    },

    addCar() {
      this.newCar.reg_number = `${this.newCar.townCode} ${this.newCar.inputedByUser}`;
      axios.post(`${this.apiUrl}/cars`, this.newCar)
        .then(response => {
          this.cars.push(response.data);
          this.newCar = { color: '', make: '', model: '', reg_number: '', townCode: '', inputedByUser: '' };
          this.renderChart();
          this.isAdding = false;
          setTimeout(() => {
            this.importBulkData();
          }, 180000);
        })
        .catch(error => console.error("Error adding car!", error));
    },
    
    deleteCar(id) {
      axios.delete(`${this.apiUrl}/cars/${id}`)
        .then(() => {
          this.cars = this.cars.filter(car => car._id !== id);
          this.renderChart();
          setTimeout(() => {
            this.importBulkData();
          }, 180000);
        })
        .catch(error => console.error("Error deleting car!", error));
    },

    editCar(car) {
      this.currentCar = { ...car };
      this.isEditing = true;
      console.log("dsds", this.currentCar);
    },
    
    updateCar() {
      axios.put(`${this.apiUrl}/cars/${this.currentCar._id}`, this.currentCar)
        .then(response => {
          const updatedCar = response.data;
          this.cars = this.cars.map(car =>
            car._id === updatedCar._id ? updatedCar : car
          );
          this.isEditing = false;
          this.currentCar = {};  
          this.renderChart(); 
          setTimeout(() => {
            this.importBulkData();
          }, 180000); 
        })
        .catch(error => console.error("Error updating car!", error));
    },
    
    importBulkData() {
      axios.post(`${this.apiUrl}/import-bulk`)
        .then(response => {
          console.log(response.data.message);
          this.fetchCars();
        })
        .catch(error => console.error("Error importing bulk data!", error));
    },
    
    init() {
      this.fetchCars();
    },

    renderChart() {
      const pieChartElement = document.getElementById('carPieChart');
      if (!pieChartElement) {
        console.error('Canvas element not found!');
        return;
      }

      const pieChartCtx = pieChartElement.getContext('2d');
      if (this.pieChartInstance) {
        this.pieChartInstance.destroy();
      }

      const brandCounts = this.cars.reduce((acc, car) => {
        acc[car.make] = (acc[car.make] || 0) + 1;
        return acc;
      }, {});

      const brandLabels = Object.keys(brandCounts);
      const brandData = Object.values(brandCounts);
      const neutralAccentColors = [
        '#D3D3D3', '#A9A9A9', '#696969', '#FF1493', 
        '#ADD8E6', '#98FF98', '#008080', '#FFFFF0', 
        '#6A5ACD', '#AFEEEE', '#B0C4DE', '#C0C0C0', 
        '#36454F', '#C4C3D0', '#696969'
      ];

      this.pieChartInstance = new Chart(pieChartCtx, {
        type: 'doughnut',
        data: {
          labels: brandLabels,
          datasets: [{
            data: brandData,
            backgroundColor: neutralAccentColors.slice(0, brandLabels.length),
            borderColor: '#ffffff',
          }]
        },
        options: {
          cutout: '50%',
          responsive: true,
        },
        
      });
    }
  }));
});
