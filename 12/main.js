function Student(name, faculty, marks) {
  this.name = name;
  this.faculty = faculty;
  this.marks = marks;

  this.getAvgMark = function () {
    const avgMark = this.marks.reduce((prev, now) => prev + now, 0) / this.marks.length;
    console.log(avgMark);

    return avgMark;
  }

  this.getMaxMark = function () {
    const maxMark = Math.max(...this.marks);
    console.log(maxMark);

    return maxMark;
  }

  this.getMinMark = function () {
    const minMark = Math.min(...this.marks);
    console.log(minMark);

    return minMark;
  }

  this.getTotal = function () {
    const total = this.marks.reduce((prev, now) => prev + now, 0);
    console.log(total);

    return total;
  }

  this.getInfo = function () {
    const info = `${this.name} ${this.faculty} ${this.marks}`;
    console.log(info);

    return info;
  }
}

const alex = new Student('Alex', 'ITMM', [5, 4, 3, 5, 5]);
const kate = new Student('Kate', 'ITMM', [5, 5, 5, 5, 5]);

alex.getAvgMark();
alex.getMaxMark();
alex.getMinMark();
alex.getTotal();
alex.getInfo();

kate.getAvgMark();
kate.getMaxMark();
kate.getMinMark();
kate.getTotal();
kate.getInfo()