import { observable, action, computed } from "mobx";
import agent from "../../agent";
import articlesDomainStore from "./articlesDomainStore.ts";

const LIMIT = 10;

export class articlesUIStore {
  @action
  makeFavorite(slug) {
    const article = articlesDomainStore.getArticle(slug);
    console.log("const", article);
    if (article && !article.favorited) {
      article.favorited = true;
      article.favoritesCount++;
      return agent.Articles.favorite(slug).catch(
        action(err => {
          article.favorited = false;
          article.favoritesCount--;
          throw err;
        })
      );
    }
    return Promise.resolve();
  }

  @action
  unmakeFavorite(slug) {
    const article = articlesDomainStore.getArticle(slug);
    if (article && article.favorited) {
      article.favorited = false;
      article.favoritesCount--;
      return agent.Articles.unfavorite(slug).catch(
        action(err => {
          article.favorited = true;
          article.favoritesCount++;
          throw err;
        })
      );
    }
    return Promise.resolve();
  }
}

export default new articlesUIStore();
