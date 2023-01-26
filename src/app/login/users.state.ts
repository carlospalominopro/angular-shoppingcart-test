import User from "../utils/user.interface";

export default interface UserState {
  user? : User;
  loading : boolean;
  message : string;
}
