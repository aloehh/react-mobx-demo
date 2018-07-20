import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../../components/DeleteButton";
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comment = this.props.comment;
    // console.log("vvvv", this.props);
    const show =
      this.props.currentUser &&
      this.props.currentUser.username === comment.author.username;
    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <Link to="/@${comment.author.username}`" className="comment-author">
            <img
              src={comment.author.image}
              className="comment-author-img"
              alt=""
            />
          </Link>
          &nbsp;&nbsp;
          <Link to="/@${comment.author.username}`" className="comment-author">
            {comment.author.username}
          </Link>
          <span className="date-posted">
            {new Date(comment.createdAt).toDateString()}
          </span>
          &nbsp;&nbsp;
          <DeleteButton
            show={show}
            slug={this.props.slug}
            commentId={comment.id}
            onDelete={this.props.onDelete}
          />
          {/* <span
            style={{ cursor: "pointer" }}
            onClick={e => {
              this.deleteComment.bind(this);
            }}
          >
            删除
          </span> */}
        </div>
      </div>
    );
  }
}
// const Comment = props => {
//   const comment = props.comment;
//   console.log("propsjjjjj", props);
//   const show =
//     props.currentUser && props.currentUser.username === comment.author.username;
//   return (
//     <div className="card">
//       <div className="card-block">
//         <p className="card-text">{comment.body}</p>
//       </div>
//       <div className="card-footer">
//         <Link to={`/@${comment.author.username}`} className="comment-author">
//           <img
//             src={comment.author.image}
//             className="comment-author-img"
//             alt=""
//           />
//         </Link>
//         &nbsp;
//         <Link to={`/@${comment.author.username}`} className="comment-author">
//           {comment.author.username}
//         </Link>
//         <span className="date-posted">
//           {new Date(comment.createdAt).toDateString()}
//         </span>
//         <DeleteButton
//           show={show}
//           slug={props.slug}
//           commentId={comment.id}
//           onDelete={props.onDelete}
//         />
//       </div>
//     </div>
//   );
// };

// export default Comment;
