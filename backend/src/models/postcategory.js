class PostCategory {
    constructor(id, parentCategoryID, name, image_url, created_at, updated_at) {
        this.id = id;
        this.parentCategoryID = parentCategoryID;
        this.name = name;
        this.image_url = image_url;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = PostCategory;
