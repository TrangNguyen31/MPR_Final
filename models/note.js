class Note {
    constructor(id, color, labelIds, content, updateAt, isBookmarked, folder = null) {
        this.id = id;
        this.color = color;
        this.labelIds = labelIds;
        this.content = content;
        this.updateAt = updateAt;
        this.isBookmarked = isBookmarked;
        this.folder = folder;
    }
}

export default Note;
