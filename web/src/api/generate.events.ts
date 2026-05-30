import { Operation, operationsApi, workTypesApi } from './client';

const ENEVT_DICT: Array<{ workerName: string; workerPosition: string }> = [
  { workerName: 'Иванов Иван Иванович', workerPosition: 'Прораб' },
  {
    workerName: 'Петров Петр Петрович',
    workerPosition: 'Бригадир монолитчиков',
  },
  { workerName: 'Сидоров Алексей Николаевич', workerPosition: 'Каменщик' },
  {
    workerName: 'Смирнов Дмитрий Сергеевич',
    workerPosition: 'Электромонтажник',
  },
  { workerName: 'Кузнецов Андрей Васильевич', workerPosition: 'Сварщик' },
  {
    workerName: 'Попов Сергей Владимирович',
    workerPosition: 'Монтажник металлоконструкций',
  },
  {
    workerName: 'Васильев Роман Александрович',
    workerPosition: 'Машинист башенного крана',
  },
  { workerName: 'Соколов Максим Игоревич', workerPosition: 'Арматурщик' },
  { workerName: 'Михайлов Денис Олегович', workerPosition: 'Бетонщик' },
  { workerName: 'Новиков Артем Дмитриевич', workerPosition: 'Штукатур-маляр' },
  { workerName: 'Федоров Илья Андреевич', workerPosition: 'Стропальщик' },
  {
    workerName: 'Морозов Никита Сергеевич',
    workerPosition: 'Облицовщик-плиточник',
  },
  {
    workerName: 'Волков Владимир Петрович',
    workerPosition: 'Инженер по технике безопасности',
  },
  { workerName: 'Лебедев Егор Михайлович', workerPosition: 'Разнорабочий' },
  { workerName: 'Козлов Александр Юрьевич', workerPosition: 'Геодезист' },
];

const getRundomWorker = () =>
  ENEVT_DICT[Math.floor(Math.random() * ENEVT_DICT.length)];

function getRandomPastDate(): Date {
  const now = Date.now();

  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const randomDays = Math.random() * (10 - 1) + 1;

  return new Date(now - randomDays * ONE_DAY_MS);
}

export async function generageEvents() {
  try {
    const workTypes = await workTypesApi.getAll();
    if (!workTypes) {
      throw new Error('Can not get work types');
    }

    const promises = Array.from({ length: 30 }, () => {
      const worker = getRundomWorker();

      const startDate = getRandomPastDate();
      const endDate = new Date(startDate.getTime() + Math.random() * 10000000);

      const workType =
        workTypes.data[Math.floor(Math.random() * workTypes.data.length)];

      return operationsApi.create({
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        workerName: worker.workerName,
        workerPosition: worker.workerPosition,
        volume: Math.random() * 100,
        unit: 'м3',
        workTypeId: workType.id,
      });
    });

    await Promise.all(promises);
  } catch (error) {
    throw error;
  }
}
