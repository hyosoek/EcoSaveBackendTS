export class CommentService {
  public getCommentAll: (pagenation: any) => Promise<Object[]>;
}

// 게시글에 속한 댓글 모두 보기 post.controller
// 관리자용 모든 댓글 모두 보기 comment.controller
// 특정 사용자가 작성한 댓글 모두 보기 account.controller
