class InfoLevel {
  constructor({ points, multiplyingFactor }) {
    this.points = points || 0;
    this.multiplyingFactor = multiplyingFactor || 25;
    this.levelPoints = 25;
    this.previousPoints = 0;
    this.level = 1;
  }

  nextPoints(previousPoints) {
    this.previousPoints = previousPoints;
    return Math.round((previousPoints * 1.2) + this.multiplyingFactor);
  }

  get pointsToNextLevel() {
    if(this.levelPoints === this.points) {
      this.levelPoints += this.nextPoints(this.levelPoints);
    }

    return this.levelPoints - this.points;
  }

  get percentage() {
    const maxPercentage = 100;

    if(this.levelPoints === this.points) {
      return this.levelPoints - this.points;
    }

    const pointsForThisLevel = this.levelPoints - this.previousPoints;
    const pointsRelativeToLevel = pointsForThisLevel - this.pointsToNextLevel;

    return ((pointsRelativeToLevel * maxPercentage) / pointsForThisLevel) / maxPercentage;
  }

  currentLevel() {
    for (this.level; this.levelPoints < this.points; this.level++) {
      this.levelPoints += this.nextPoints(this.levelPoints);
    }

    if(this.levelPoints === this.points) {
      this.level++;
    }
    return this.level;
  }
}

export default InfoLevel;