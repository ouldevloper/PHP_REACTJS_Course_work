import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import {ru} from "../src/consts/ru";
import {en} from "../src/consts/en";

const fallbackLng = ['ru'];
const availableLanguages = ['ru', 'en', 'kz'];


const resources = {
    ru:{
      translation: {
          "tasks": "Задачи",
          "task": "Задача",
          "take_to_work": "Давать поручения",
          "in_queeue": "В ожидани",
          "my_task": "Мои",
          "in_process": "В работе",
          "archieve": "Архив",
          "author": "Автор",
          "subject": "Тема",
          "sys_admin": "целевой пользователь",
          "priority": "Приоритет",
          "description": "Операция",
          "details": "Подробности",
          "complete": "Выполнил",
          "information": "Информация",
          "files": "Файлы",
          "history": "История",
          "upload_files": "Загрузить файлы",
          "submit": "Отправить",
          "task_done": "Задача выполнена",
          "task_in_process": "Задача в процессе",
          "no_data_found": "Данные не найдены",
          "support_service": "Служба поддержки",
          "active": "Активные",
          "creation_date": "Дата создания",
          "create_task": "Создать задачу",
          "redirect": "Перенаправить",
          "operation": "Операция",
          "waitting_confirmation": "Ожидает подтверждения",
          "still_in_work": " Eще в работе",
          "empty_log": "Пустой журнал",
          "accept": "Принять",
          "cancel": "Отклонить",
          "confirm": "Подтвердить",
          "low": "Низкий",
          "middle": "Средний",
          "hight": "Высокий",
          "critical": "Критический",
          "rate_task": "Оцените пажалста качества исполнения заявка, Где 5 отлично, а 1 очень плохо.",
          "placeholder_feedback": "Дает нам ваш отзыв",
          "rejection_reason": "Причина отклонения задачa.",
          "ask_cancel_task": "Вы уверены, что хотите отменить эту задачу?",
          "back": "Назад",
          "create_application": "Создание заявки",
          "op_success": "Завершено успешно!",
          "op_failed": "Не удалось",
          "author_requred": "Автор обязательна!",
          "priority_required": "Приоритет обязательна!",
          "description_required": "Описание обязательна!",
          "subject_required": "тема обязательна!",
          "files_upload": "Файлы (По желанию)",
          "extra_options": "Дополнительные параметры",
          "request_accept_text": "Запросить cопроводительный текст",
          "period_of_execution": "Срок иcполнения",
          "extra": "В случае если не запонено срок будет  расчитан автоматически исход от приоритета задачи",
          "placeholder_comment": "Комментарий,  введите @ для упоминания автора задачи или системного администратора",
          "reject_task":"Задача Отклонено владельцем В ",
          "confirm_task":"Подтверждено задание владельцем В ",
          "accept_task":"Приняли в работу В ",
          "task_accept_by_sys_admin":"Ваша задача принята системным администратором В ",
          "redirected":"Перенаправили В ",
          "cancel_task":"Задача, отмененная владельцем В ",
          "applied":"Обратились В ",
          "task_done_process" : "Задача выполнена B ",
          "log_cancel_task":"Задача, отмененная владельцем",
          "log_task_done":"Задача выполнена",
          "log_reject_task":"Задача Отклонено владельцем",
          "log_confirm_task":"Подтверждено задание владельцем",
          "log_accept_task":" Приняли в работу ",
          "log_create_task":"создал задачу",
          "log_redirect_task":"Перенаправлено k",
          "log_view_task":"Задача, рассматриваемая ",
          "role":"роль",
          "role_required":"требуется роль",
          "boss":"босс ",
          "head":"главный ",
          "specialist":"специалист",
          "password":"пароль ",
          "password_required":"требуется пароль ",
          "create_user":"Создать нового пользователя",




      }
  },
    en: {
      translation: {
          "tasks" : "Tasks",
          "task" : "Task",
          "take_to_work" : "Give instructions",
          "in_queeue" : "In Anticipation",
          "my_task" : "My Tasks",
          "in_process" : "In Process",
          "archieve" : "Archieve",
          "author" : "Author",
          "subject" : "Subject",
          "sys_admin":"target user",
          "priority" : "Priority",
          "description" : "Description",
          "details" : "Details",
          "complete" : "Complete",
          "information" : "Information",
          "files" : "Files",
          "history" : "History",
          "upload_files" : "Upload Files",
          "submit" : "Submit",
          "task_done" : "Task Completed",
          "task_in_process" : "Task in Process",
          "no_data_found":"No Data Found",
          "support_service" : "Support Service",
          "active":"Active Tasks",
          "creation_date":"Date of creation",
          "create_task":"Create New Task",
          "create_user":"Create New User",
          "redirect":"Redirect",
          "operation" : "Operation",
          "waitting_confirmation" : "Waiting for confirmation",
          "still_in_work" : "Still in work",
          "empty_log":"Empty Log",
          "accept":"Accept",
          "cancel":"Cancel",
          "confirm":"Confirm",
          "low":"Low",
          "middle": "Middle",
          "hight":"Hieght",
          "critical": "Critical",
          "rate_task":"Please rate the quality of the execution of the application, Where 5 is excellent, and 1 is very bad.",
          "placeholder_feedback":"Gives us your feedback",
          "rejection_reason":"Reason for rejecting a task.",
          "ask_cancel_task":"Are you sure you want to cancel this task?",
          "back":"Back",
          "create_application":"Create Application",
          "op_success":"Success",
          "op_failed":"Failed",
          "author_requred":"Author required!",
          "priority_required":"Priority Required!",
          "description_required":"Description Required!",
          "subject_required":"Subject Required!",
          "files_upload":"Files (Optional)",
          "extra_options":"Extra Options",
          "request_accept_text":"Request accompanying text",
          "period_of_execution":"Period Of Execution",
          "extra":"If not completed, the deadline will be calculated automatically proceed from task priority",
          "placeholder_comment":"Comment, type @ to mention the owner or the system administrator",
          "reject_task":"The task was rejected by the Owner On ",
          "confirm_task":"The task has been confirmed by the Owner On ",
          "accept_task":"Accepted to work On ",
          "task_accept_by_sys_admin":"Your task has been accepted by the system administrator On ",
          "redirected":"Redirected On ",
          "cancel_task":"The task canceled by the Owner On",
          "applied":"Applied On ",
          "task_done_process" : "Task Completed On ",
          "log_cancel_task":"The task canceled by the Owner",
          "log_task_done":"Task completed",
          "log_reject_task":"The task was rejected by the Owner",
          "log_confirm_task":"The task was confirmed by the Owner",
          "log_accept_task":"Accepted to work",
          "log_create_task":" Created Task ",
          "log_redirect_task":"Redirected To ",
          "log_view_task":"Task viewed by",
          "role":"role",
          "role_required":"role is required",
          "boss":"boss",
          "head":"head",
          "specialist":"specialist",
          "password":"password ",
          "password_required":"password required"
      }
  }
};
const lan = localStorage.getItem('i18nextLng');
i18n
  .use(Backend)                                             
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    resources,
    lng: lan?lan:"ru",
    fallbackLng:fallbackLng,
    supportedLngs:availableLanguages,
    detection:  {
      checkWhitelist: true,
      order:['cookie','localStorage','htmlTag','navigator'],
      //caches:['cookie','localStorage','htmlTag','navigator']
    },
    whitelist: availableLanguages,
    react:{
        useSuspense:false
    },
    interpolation: {
      escapeValue: false, 
    }
  });
 
  export default i18n;