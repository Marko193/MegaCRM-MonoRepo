import {ApiConfigService} from '../config/config.service';
import {Injectable} from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import {PageMetaDto} from '../pagination';

dayjs.extend(isBetween);

@Injectable()
export class HelperFunctions {
  constructor(private readonly configService: ApiConfigService) {}

  currentDate() {
    return new Date();
  }

  expTime() {
    return new Date(
      Number(this.currentDate().getTime()) +
        Number(Number(this.configService.jwtRefreshTokenExpTime) * 1000)
    );
  }

  isDateInThePast(comparableDate: Date) {
    return dayjs().isAfter(dayjs(comparableDate));
  }

  isDateBetweenTimestamps(
    comparableDate: Date,
    startDate: Date,
    endDate: Date
  ) {
    return dayjs(comparableDate).isBetween(startDate, endDate, 'day', '[]');
  }

  calculateDaysNumber(startDate: Date, endDate: Date) {
    return dayjs(startDate).diff(dayjs(endDate), 'days', true);
  }

  getYearsTimestampsRequestsList(usersList, requestsType) {
    const yearsTimestampsRequestsList = [];
    usersList.map((el) => {
      return yearsTimestampsRequestsList.push({
        user_id: el.id,
        name: el.name,
        surname: el.surname,
        requests: [
          {
            '2020': this.filterRequestsList(
              requestsType === 'calendarRequests'
                ? el.user_calendar_requests
                : el.user_warehouse_requests,
              el.id,
              2020
            ),
            '2021': this.filterRequestsList(
              requestsType === 'calendarRequests'
                ? el.user_calendar_requests
                : el.user_warehouse_requests,
              el.id,
              2021
            ),
            '2022': this.filterRequestsList(
              requestsType === 'calendarRequests'
                ? el.user_calendar_requests
                : el.user_warehouse_requests,
              el.id,
              2022
            ),
            '2023': this.filterRequestsList(
              requestsType === 'calendarRequests'
                ? el.user_calendar_requests
                : el.user_warehouse_requests,
              el.id,
              2023
            ),
            '2024': this.filterRequestsList(
              requestsType === 'calendarRequests'
                ? el.user_calendar_requests
                : el.user_warehouse_requests,
              el.id,
              2024
            ),
            '2025': this.filterRequestsList(
              requestsType === 'calendarRequests'
                ? el.user_calendar_requests
                : el.user_warehouse_requests,
              el.id,
              2025
            ),
          },
        ],
      });
    });
    return yearsTimestampsRequestsList;
  }

  filterRequestsList(requestsList, user_id: number, year: number) {
    return requestsList
      .map((req) => {
        if (
          req.status == 'approved' &&
          dayjs(req.end_date).year() == year &&
          req.user_id == user_id
        ) {
          return {
            request_id: req.id,
            type: req.type,
          };
        }
      })
      .filter((el) => {
        return el !== null;
      });
  }

  public async createQueryPaginateDataHelper(actualPageOptions, queryBuilder) {
    const itemCount = await queryBuilder.getCount();

    const {entities} = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: actualPageOptions,
    });

    return {entities, pageMetaDto};
  }

  public async createSelectPaginateDataHelper(
    actualPageOptions,
    fullEntitiesList,
    chosenItems
  ) {
    const totalItemCount = Object.keys(fullEntitiesList).length;

    const pageMetaDto = new PageMetaDto({
      itemCount: totalItemCount,
      pageOptionsDto: actualPageOptions,
    });

    return {entities: chosenItems, pageMetaDto};
  }

  static checkIfQueryParamCorrect(defaultValue, queryParam): number {
    return queryParam == 0 ||
      queryParam === undefined ||
      isNaN(Number(queryParam))
      ? Number(defaultValue)
      : Number(queryParam);
  }

  static checkIfValueIncludesInEnum(defaultValue, queryParamValue, enumItem) {
    return !Object.values(enumItem).includes(queryParamValue)
      ? defaultValue
      : queryParamValue;
  }
}
