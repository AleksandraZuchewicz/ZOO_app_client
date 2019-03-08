const serverUrl = "http://127.0.0.1:3000";
const emptyEmployee = {
  id: null,
  role: "",
  name: "No employees"
};
const emptyAnimal = {
  id: null,
  kind: "",
  name: "No animals"
};
class ZOO {
  constructor(name) {
    this.name = name;
    this.animals = [];
    this.employees = [];
    this.events = [];
    this.foods = ["Banana", "Grapes", "Pork", "Chicken"];
  }
  getFoods() {
    return this.foods;
  }
  getAnimals() {
    return this.animals;
  }
  setAnimals(animals) {
    this.animals = animals;
  }
  getOneAnimal(id) {
    for (let i = 0; i < this.animals.length; i++) {
      let currentAnimal = this.animals[i];
      if (currentAnimal.id == id) {
        return currentAnimal;
      }
    }
    return null;
  }
  getOneEmployee(id) {
    for (let i = 0; i < this.employees.length; i++) {
      let currentEmplyee = this.employees[i];
      if (currentEmplyee.id == id) {
        return currentEmplyee;
      }
    }
    return this.employees[id];
  }
  setEmployees(employees) {
    this.employees = employees;
  }
  getEvents() {
    return this.events;
  }
  getEmployees() {
    return this.employees;
  }
  setEvents(events) {
    this.events = events;
  }
  getNextEmployee(currentEmployeeId) {
    let nextEmployee;
    let zoo = this;
    zoo.getEmployees().forEach((employee, index, employees) => {
      if (currentEmployeeId == employee.id) {
        let nextEmployeeIndex = index + 1 != employees.length ? index + 1 : 0;
        if (employees.length) {
          nextEmployee = employees[nextEmployeeIndex];
        }
      }
    });
    if (!nextEmployee) {
      nextEmployee = emptyEmployee;
    }
    return nextEmployee;
  }
  getPreviousEmployee(currentEmployeeId) {
    let previousEmployee;
    let zoo = this;
    zoo.getEmployees().forEach((employee, index, employees) => {
      if (currentEmployeeId == employee.id) {
        let previousEmployeeIndex =
          index - 1 != -1 ? index - 1 : employees.length - 1;
        if (employees.length) {
          previousEmployee = employees[previousEmployeeIndex];
        }
      }
    });
    if (!previousEmployee) {
      previousEmployee = emptyEmployee;
    }
    return previousEmployee;
  }
  getNextAnimal(currentAnimalId) {
    let nextAnimal;
    let zoo = this;
    zoo.getAnimals().forEach((animal, index, animals) => {
      if (currentAnimalId == animal.id) {
        let nextAnimalIndex = index + 1 != animals.length ? index + 1 : 0;
        if (animals.length) {
          nextAnimal = animals[nextAnimalIndex];
        }
      }
    });
    if (!nextAnimal) {
      nextAnimal = emptyAnimal;
    }
    return nextAnimal;
  }
  getPreviousAnimal(currentAnimalId) {
    let previousAnimal;
    let zoo = this;
    zoo.getAnimals().forEach((animal, index, animals) => {
      if (currentAnimalId == animal.id) {
        let previousAnimalIndex =
          index - 1 != -1 ? index - 1 : animals.length - 1;
        if (animals.length) {
          previousAnimal = animals[previousAnimalIndex];
        }
      }
    });
    if (!previousAnimal) {
      previousAnimal = emptyAnimal;
    }
    return previousAnimal;
  }
  getNextFood(currentFood) {
    const foods = this.getFoods();
    let indexOfCurrentFood = this.getFoods().findIndex(
      food => food == currentFood
    );
    let nextFoodIndex =
      indexOfCurrentFood + 1 != foods.length ? indexOfCurrentFood + 1 : 0;
    return foods[nextFoodIndex];
  }
  getPreviousFood(currentFood) {
    const foods = this.getFoods();
    let indexOfCurrentFood = this.getFoods().findIndex(
      food => food == currentFood
    );
    let nextFoodIndex =
      indexOfCurrentFood - 1 != -1 ? indexOfCurrentFood - 1 : foods.length - 1;
    return foods[nextFoodIndex];
  }
}
let zooBox = Vue.component("zoo-box", {
  props: ["data"],
  template: `
  <div> 
    <div><h4>{{ data.title }}</h4></div>
    <div><i class="arrow left" v-on:click="previousElement"></i> <img :src="data.imgSources[getCurrentClass()]" /> <i class="arrow right" v-on:click="nextElement"></i> </div>
    <div><span>{{ getCurrentName() }}</span></div>
    <div><span>{{ getCurrentClass() }}</span></div>
    <br />
    </div>
    `,
  methods: {
    getCurrentName() {
      switch (this.data.title) {
        case "Employees":
          return this.data.currentEmployee.name;
          break;
        case "Animals":
          return this.data.currentAnimal.name;
          break;
        case "Foods":
          return "";
          break;
        default:
      }
    },
    getCurrentClass() {
      switch (this.data.title) {
        case "Employees":
          return this.data.currentEmployee.role;
          break;
        case "Animals":
          return this.data.currentAnimal.kind;
          break;
        case "Foods":
          return this.data.currentFood;
          break;
        default:
      }
    },
    previousElement: function(event) {
      switch (this.data.title) {
        case "Employees":
          this.$root.switchToPreviousEmployee();
          break;
        case "Animals":
          this.$root.switchToPreviousAnimal();
          break;
        case "Foods":
          this.$root.switchToPreviousFood();
          break;
        default:
      }
    },
    nextElement: function(event) {
      switch (this.data.title) {
        case "Employees":
          this.$root.switchToNextEmployee();
          break;
        case "Animals":
          this.$root.switchToNextAnimal();
          break;
        case "Foods":
          this.$root.switchToNextFood();
          break;
        default:
      }
    }
  }
});
let zooLogs = Vue.component("zoo-logs", {
  props: ["events"],
  template: `
  <ul id="example-1">
  <span v-for="event in events" >
    {{ event }}<br />
  </span>
</ul>
      `
});
var app = new Vue({
  el: "#app",
  data: {
    employeeData: {
      title: "Employees",
      imgSources: {
        Feeder: "./assets/feeder.png",
        Trainer: "./assets/trainer.png"
      },
      currentEmployee: emptyEmployee
    },
    animalData: {
      title: "Animals",
      imgSources: {
        Baboon: "./assets/baboon.png",
        Chimpanzee: "./assets/chimpanzee.png",
        Tiger: "./assets/tiger.png",
        Lion: "./assets/lion.png"
      },
      currentAnimal: emptyAnimal
    },
    foodData: {
      title: "Foods",
      imgSources: {
        Banana: "./assets/banana.png",
        Grapes: "./assets/grapes.png",
        Pork: "./assets/pork.png",
        Chicken: "./assets/chicken.png"
      },
      currentFood: "Banana"
    },

    zooSingleton: new ZOO("Zoo!")
  },
  components: {
    zooBox: zooBox,
    zooLogs: zooLogs
  },
  methods: {
    switchToNextEmployee: function() {
      const employeeId = this.employeeData.currentEmployee.id;
      const nextEmployee = this.zooSingleton.getNextEmployee(employeeId);
      this.employeeData.currentEmployee = nextEmployee;
    },
    switchToNextAnimal: function() {
      const animalId = this.animalData.currentAnimal.id;
      const nextAnimal = this.zooSingleton.getNextAnimal(animalId);
      this.animalData.currentAnimal = nextAnimal;
    },
    switchToNextFood: function() {
      const food = this.foodData.currentFood;
      const nextFood = this.zooSingleton.getNextFood(food);
      this.foodData.currentFood = nextFood;
    },
    switchToPreviousEmployee: function() {
      const employeeId = this.employeeData.currentEmployee.id;
      const previousEmployee = this.zooSingleton.getPreviousEmployee(
        employeeId
      );
      this.employeeData.currentEmployee = previousEmployee;
    },
    switchToPreviousAnimal: function() {
      const animalId = this.animalData.currentAnimal.id;
      const previousAnimal = this.zooSingleton.getPreviousAnimal(animalId);
      this.animalData.currentAnimal = previousAnimal;
    },
    switchToPreviousFood: function() {
      const food = this.foodData.currentFood;
      const previousFood = this.zooSingleton.getPreviousFood(food);
      this.foodData.currentFood = previousFood;
    }
  },
  mounted() {
    initializeZoo();
    setInterval(updateZoo, 30 * 1000);
  }
});
async function initializeZoo() {
  try {
    await updateZoo();
    if (app.zooSingleton.getEmployees().length) {
      app.employeeData.currentEmployee = app.zooSingleton.getEmployees()[0];
    }
    if (app.zooSingleton.getAnimals().length) {
      app.animalData.currentAnimal = app.zooSingleton.getAnimals()[0];
    }
  } catch (error) {
    console.error(error);
  }
}
async function updateZoo() {
  try {
    const animalsResponse = await axios.get(serverUrl + "/animals");
    app.zooSingleton.setAnimals(animalsResponse.data);
    const employeesResponse = await axios.get(serverUrl + "/employees");
    app.zooSingleton.setEmployees(employeesResponse.data);
    const eventsResponse = await axios.get(serverUrl + "/events");
    let events = eventsResponse.data;
    events = events.length > 20 ? events.splice(events.length - 20) : events;
    events.reverse();
    app.zooSingleton.setEvents(events);
  } catch (error) {
    console.error(error);
  }
}
