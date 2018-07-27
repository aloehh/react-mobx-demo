import { observable, action, computed } from "mobx";
import agent from "../../agent.js";

const LIMIT: number = 10;

export class articlesStore {
  @observable isLoading: boolean = false;
  @observable articlesRegistry: any = observable.map();
  @observable predicate: any = {};
  @observable page: number = 0;
  @observable totalPagesCount: number = 0;

  @computed
  get articles() {
    return this.articlesRegistry.values();
  }

  clear() {
    this.articlesRegistry.clear();
    this.page = 0;
  }

  getArticle = (slug: string) => {
    return this.articlesRegistry.get(slug);
  };

  @action
  setPage(page: number) {
    this.page = page;
  }

  @action
  setPredicate(predicate) {
    if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return;
    this.clear();
    this.predicate = predicate;
    console.log(predicate, "predicate");
  }

  $req() {
    if (this.predicate.myFeed) return agent.Articles.feed(this.page, LIMIT);
    if (this.predicate.favoritedBy)
      return agent.Articles.favoritedBy(
        this.predicate.favoritedBy,
        this.page,
        LIMIT
      );
    if (this.predicate.tag)
      return agent.Articles.byTag(this.predicate.tag, this.page, LIMIT);
    if (this.predicate.author)
      return agent.Articles.byAuthor(this.predicate.author, this.page, LIMIT);
    return agent.Articles.all(this.page, LIMIT, this.predicate);
  }

  @action
  loadArticle(slug, { acceptCached = false } = {}) {
    if (acceptCached) {
      const article = this.getArticle(slug);
      if (article) return Promise.resolve(article);
    }
    this.isLoading = true;
    return agent.Articles.get(slug)
      .then(
        action(({ article }) => {
          this.articlesRegistry.set(article.slug, article);
          return article;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  @action
  loadArticles() {
    this.isLoading = true;
    return this.$req()
      .then(
        action(({ articles, articlesCount }) => {
          this.articlesRegistry.clear();
          articles.forEach(article =>
            this.articlesRegistry.set(article.slug, article)
          );
          this.totalPagesCount = Math.ceil(articlesCount / LIMIT);
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  @action
  createArticle(article) {
    return agent.Articles.create(article).then(({ article }) => {
      this.articlesRegistry.set(article.slug, article);
      return article;
    });
  }

  @action
  updateArticle(data) {
    return agent.Articles.update(data).then(({ article }) => {
      this.articlesRegistry.set(article.slug, article);
      return article;
    });
  }

  @action
  deleteArticle(slug: string) {
    this.articlesRegistry.delete(slug);
    return agent.Articles.del(slug).catch(
      action(err => {
        this.loadArticles();
        throw err;
      })
    );
  }
}

export default new articlesStore();
