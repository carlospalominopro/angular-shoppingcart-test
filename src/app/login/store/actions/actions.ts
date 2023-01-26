import { createAction, props } from "@ngrx/store";
import User from "src/app/utils/user.interface";

export const getUser = createAction(
  "[Login] App get User",
  props<{ user?: User }>()
);

export const getAuth = createAction(
  "[Login] App Authentication",
  props<{ user?: User }>()
);

export const errorHand = createAction(
  "[Login] Error",
  props<{ message: string }>()
);


