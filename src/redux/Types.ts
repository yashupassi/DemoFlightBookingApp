import Colors from "../common/styles/Colors";

/**
 * Common Constants
 */
export const DEBOUNCE_API_SUCCESS_CODE = "5"
export const SUCCESS = "success";
export const UPDATE = "update";
export const LOADING = "loading";
export const ERROR = "error";
export const NOT_FOUND = "not_found";
export const MESSAGE = "message";
export const STATUS = "status";
export const PENDING = "pending";
export const EMPTY = "empty";
export const RESPONSE = "response";
export const LOG_OUT = "log_out";
export const TOKEN_NOT_FOUND = "token_not_found";
export const ACTIVE = 1;
export const DEACTIVE = 0;
export const USER_NOT_CONFIRMED_EXCEPTION = "UserNotConfirmedException";
export const VERIFY_USER = "verify_user";
export const VERIFY_EMAIL = "verify_email";
export const NOT_AUTHORIZED_EXCEPTION = "NotAuthorizedException";
export const YES = 'YES';
export const NO = "NO";
export const VALIDATION_ERROR = "validation_error";
export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const DEFAULT_LANGUAGE = "en";
export const USER_DENIED_GALLERY_PERMISSION = "User cancelled image selection";
export const FILTER_TYPE_SELECTION = "selection"
export const FILTER_TYPE_RATING = "rating"
export const FILTER_TYPE_MULTI_SLIDER = "multi_slider"
export const PASSWORD_ACCEPTANCE_SCORE = 33
export const COUNT_ADD = 'add'
export const COUNT_SUBTRACT = 'sub'
export const RUPPEE_SYMBOL = '₹'
export const LOWEST_PRICE = 'lowestPrice'
export const HIGHEST_PRICE = 'highestPrice'

export const ICON_TYPE_PASSENGER_ADULT = "ICON_TYPE_PASSENGER_ADULT"
export const ICON_TYPE_PASSENGER_CHILD = "ICON_TYPE_PASSENGER_CHILD"
export const ICON_TYPE_PASSENGER_INFANT = "ICON_TYPE_PASSENGER_INFANT"

export const PASSWORD_SCORE_BAR_ARRAY = [
    {
        value: 1,
        color: Colors.redish_brown,
        title: "Too Weak",
        progress: 0
    },
    {
        value: 2,
        color: Colors.orange,
        title: "Weak",
        progress: 33
    },
    {
        value: 3,
        color: Colors.yellow,
        title: "Moderate",
        progress: 66
    },
    {
        value: 4,
        color: Colors.theme_color,
        title: "Strong",
        progress: 100
    }
]
export const ECONOMY_CLASS = "Economy"
export const BUSINESS_CLASS = "Business"
export const ELITE_CLASS = "Elite"


export const FLIGHT_CLASS_DATA = [
    { label: 'Economy', value: ECONOMY_CLASS },
    { label: 'Business', value: BUSINESS_CLASS },
    { label: 'Elite', value: ELITE_CLASS },
  ];

/**
 * Local storage keys
 */

export const FOODZONE_LOGIN_DATA = "foodzone_login_data";
export const FOODZONE_USER_DATA = "foodzone_user_data"
export const FOODZONE_CART_DATA = "foodzone_cart_data"

/** ---------------------------------------------- */

/** Regexp Patterns */

export const PAPER_PATTERN_NAME = /[0-9]|[#$%^&*().,/-<>]/g;
export const PAPER_PATTERN_REMOVE_SPACE = /\s/gi;
export const PAPER_PATTERN_REMOVE_SPACE_AND_NUMERIC_VALUES = /[^a-zA-Z+]/gi;
export const PAPER_PATTERN_NUMERIC = /\D/gi;

/**------------------------------------------------------------------------ */

/**
 * Screen Names
 * */
export const LIST_SCREEN = "List"
export const SEARCH_FLIGHT_SCREEN = "SearchFlight"
export const PASSENGERS_SCREEN = "Passengers"

/** ------------------------------ */

/**
 * Device constants
 * */
export const DEVICE_CONSTANTS_ROOT = "device_constants";
export const DEVICE_CONSTANTS_UPDATE = "device_constants_update";
export const DEVICE_CONSTANTS_RESET = "device_constants_reset";
export const DEVICE_CONSTANTS_KEY = "device_constants_key";

//Device UI constants
export const DEVICE_CONSTANTS_IS_LOGGED_IN = "device_constants_is_logged_in";
export const DEVICE_CONSTANTS_REQUEST_STATUS = "device_constants_request_status";
export const DEVICE_CONSTANTS_IS_ON_BOARD = "device_constants_is_on_board";
export const DEVICE_CONSTANTS_LOADING = "device_constants_loading"
export const DEVICE_CONSTANTS_LANGUAGE = "device_constants_language"

/** ------------------------------ */

/**
* User constants
* */
export const USER_ROOT = "user";
export const USER_UPDATE = "user_update";
export const USER_RESET = "user_reset";
export const USER_KEY = "user_key";

//User UI constants
export const USER_DATA = "user_data";
export const USER_LOCATION = "user_location"

/** ------------------------------ */

/**
* Flights constants
* */
export const FLIGHT_ROOT = "flight";
export const FLIGHT_UPDATE = "flight_update";
export const FLIGHT_RESET = "flight_reset";
export const FLIGHT_KEY = "flight_key";

//Flights UI constants
export const FLIGHT_DATA = "flight_data";
export const FLIGHT_REQUEST_LOADING = "flight_request_loading"
export const FLIGHT_FROM = 'flight_from'
export const FLIGHT_TO = 'flight_to'
export const FLIGHT_DATE = 'flight_date'
export const FLIGHT_NON_STOP_FIRST = 'flight_non_stop_first'
export const FLIGHT_ADULTS = 'flight_adults'
export const FLIGHT_CHILD = 'flight_child'
export const FLIGHT_INFANT = 'flight_infant'
export const FLIGHT_CLASS = 'flight_CLASS'

/** ------------------------------ */