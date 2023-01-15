export class SelectListModel {
  Value: string;
  Text: string;
}

/**
 * General pagination model
 * TotalCount -> Total count of records without limits
 * NextPage -> Pagination indication,
 *  1 -> Next page is available,
 * -1 -> Next page is not available,
 */
export class PaginationModel {
  public TotalCount: number;
  public NextPage: number;
}

export class CountModel {
  Count: number;
}

export class SuccessForFavourite {
  count: number;
  status: boolean;
}

/**
 * General respone model
 * <T> -> is general type to pass the model in it
 */
export class BTResponseModel<T> {
  data: T;
  status: boolean;
  message: string;
}

export class GetOtherProjectsListModel {
  OtherProjects: Array<OtherProjectsModel>;
}

export class OtherProjectsModel {
  OtherProjectsId: number;
  Title: string;
  Description: string;
  BannerImage: string;
  BackgroundImage: string;
}

export class CheckIfSubscriptionIsOver {
  IsSubscribed: boolean;
  IsTrialPeriodEnded: boolean;
}

export class LocationSelectListitemModel {
  List: Array<SelectListModel>;
}
