import React from "react";
import ArticlePreview from "../ArticlePreview";
import ListPagination from "../ListPagination";
import LoadingSpinner from "../LoadingSpinner";

const ArticleList = props => {
  console.log("arlist", props);
  if (props.loading && props.articles.length === 0) {
    return <LoadingSpinner />;
  }

  if (props.articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {props.articles.map(article => {
        return <ArticlePreview article={article} key={article.slug} />;
      })}

      <ListPagination
        onSetPage={props.onSetPage}
        totalPagesCount={props.totalPagesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ArticleList;
