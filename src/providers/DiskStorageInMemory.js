class DiskStorage {
  storage = []

  async saveFile(fileName) {
    const length = this.storage.push(fileName)
    
    return this.storage[ length - 1 ]
  }

  async deleteFile(fileName) {
    this.storage = this.storage.filter(file => file !== fileName)
  }
}

module.exports = DiskStorage