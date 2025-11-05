export interface ToggleLikePayload {
    postId: string;
  }
  
  export interface AddCommentPayload {
    postId: string;
    comment: string;
    userId: string;
  }