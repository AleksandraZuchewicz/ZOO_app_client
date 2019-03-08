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
    this.tricks = ["Hop", "Clap", "Sit"];
  }
  getTricks() {
    return this.tricks;
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
  getNextTrick(currentTrick) {
    const tricks = this.getTricks();
    let indexOfCurrentTrick = this.getTricks().findIndex(
      trick => trick == currentTrick
    );
    let nextTrickIndex =
      indexOfCurrentTrick + 1 != tricks.length ? indexOfCurrentTrick + 1 : 0;
    return tricks[nextTrickIndex];
  }
  getPreviousTrick(currentTrick) {
    const tricks = this.getTricks();
    let indexOfCurrentTrick = this.getTricks().findIndex(
      trick => trick == currentTrick
    );
    let nextTrickIndex =
      indexOfCurrentTrick - 1 != -1
        ? indexOfCurrentTrick - 1
        : tricks.length - 1;
    return tricks[nextTrickIndex];
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
    <div><span v-if="data.title=='Animals'">Hunger: {{ data.currentAnimal.hunger }}</span></div>
    <div><button v-if="data.title=='Employees' && getCurrentClass()=='Trainer'" v-on:click="trainAnimal" class="btn btn-primary">Train</button></div>
    <div><button v-if="data.title=='Employees' && getCurrentClass()=='Feeder'" v-on:click="feedAnimal" class="btn btn-primary">Feed</button></div>
    <div><button v-if="data.title=='Animals' && data.currentAnimal.tricks && data.currentAnimal.tricks.includes('hop')" v-on:click="doHop" class="btn btn-primary">Hop</button></div>
    <div><button v-if="data.title=='Animals' && data.currentAnimal.tricks && data.currentAnimal.tricks.includes('clap')" v-on:click="doClap" class="btn btn-primary">Clap</button></div>
    <div><button v-if="data.title=='Animals' && data.currentAnimal.tricks && data.currentAnimal.tricks.includes('sit')" v-on:click="doSit" class="btn btn-primary">Sit</button></div>
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
        case "Tricks":
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
        case "Tricks":
          return this.data.currentTrick;
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
        case "Tricks":
          this.$root.switchToPreviousTrick();
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
        case "Tricks":
          this.$root.switchToNextTrick();
          break;
        default:
      }
    },
    feedAnimal: async function(event) {
      const employee = this.$root.employeeData.currentEmployee;
      const animal = this.$root.animalData.currentAnimal;
      await axios.get(
        serverUrl + "/employees/" + employee.id + "/feed/" + animal.id
      );
      updateZoo();
      this.$root.animalData.currentAnimal.hunger = 100;
    },
    trainAnimal: async function(event) {
      const employee = this.$root.employeeData.currentEmployee;
      const animal = this.$root.animalData.currentAnimal;
      const trick = this.$root.trickData.currentTrick.toLowerCase();
      await axios.get(
        serverUrl +
          "/employees/" +
          employee.id +
          "/train/" +
          trick +
          "/" +
          animal.id
      );
      updateZoo();
    },
    doSit: function(event) {
      // use axios to train animal
      // call updateZoo
    },
    doClap: function(event) {
      // use axios to do the trick
      // call updateZoo
    },
    doHop: function(event) {
      // use axios to do the trick
      // call updateZoo
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
    trickData: {
      title: "Tricks",
      imgSources: {
        Hop: "./assets/hop.png",
        Clap: "./assets/clap.png",
        Sit: "./assets/sit.png"
      },
      currentTrick: "Hop"
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
    switchToNextTrick: function() {
      const trick = this.trickData.currentTrick;
      const nextTrick = this.zooSingleton.getNextTrick(trick);
      this.trickData.currentTrick = nextTrick;
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
    },
    switchToPreviousTrick: function() {
      const trick = this.trickData.currentTrick;
      const previousTrick = this.zooSingleton.getPreviousTrick(trick);
      this.trickData.currentTrick = previousTrick;
    }
  },
  mounted() {
    updateZoo();
    setInterval(updateZoo, 30 * 1000);
  }
});
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
    if (
      app.zooSingleton.getEmployees().length &&
      !app.employeeData.currentEmployee.id
    ) {
      app.employeeData.currentEmployee = app.zooSingleton.getEmployees()[0];
    }
    if (
      app.zooSingleton.getAnimals().length &&
      !app.animalData.currentAnimal.id
    ) {
      app.animalData.currentAnimal = app.zooSingleton.getAnimals()[0];
    }
  } catch (error) {
    console.error(error);
  }
}
