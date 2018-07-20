import { observable, action } from "mobx";
import agent from "../agent";

export class CommentsStore {
  @observable isCreatingComment = false;
  @observable isLoadingComments = false;
  @observable commentErrors = undefined;
  @observable articleSlug = undefined;
  @observable comments = [];

  @action
  setArticleSlug(articleSlug) {
    if (this.articleSlug !== articleSlug) {
      this.comments = [];
      this.articleSlug = articleSlug;
    }
  }

  @action
  loadComments() {
    this.isLoadingComments = true;
    this.commentErrors = undefined;
    return agent.Comments.forArticle(this.articleSlug)
      .then(
        action(({ comments }) => {
          this.comments = comments;
        })
      )
      .catch(
        action(err => {
          this.commentErrors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.isLoadingComments = false;
        })
      );
  }

  //finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
  @action
  createComment(comment) {
    this.isCreatingComment = true;
    return agent.Comments.create(this.articleSlug, comment)
      .then(() => this.loadComments())
      .finally(
        action(() => {
          this.isCreatingComment = false;
        })
      );
  }

  @action
  deleteComment(id) {
    const idx = this.comments.findIndex(c => c.id === id);
    if (idx > -1) this.comments.splice(idx, 1);
    return agent.Comments.delete(this.articleSlug, id).catch(
      action(err => {
        this.loadComments();
        throw err;
      })
    );
  }
}

export default new CommentsStore();
