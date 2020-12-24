import addFaq from './subCommands/addFaq';
import client from '../../client';
import { commandHandler } from '../../utils';
// import deleteFaq from './subCommands/deleteFaq';
import defineFaq from './subCommands/defineFaq';
// import editFaq from './subCommands/editFaq';
import { getStrings } from './constants';
import listFaqs from './subCommands/listFaqs';

const subCommands = {
  add: addFaq,
  define: defineFaq,
  //  delete: deleteFaq,
  //  edit: editFaq,
  list: listFaqs
};

client.on('faq', () => commandHandler(subCommands, getStrings()));
