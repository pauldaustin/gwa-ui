import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let endPoints = [
  {id: "cpf_logs", title: 'CPF Logs'},
  {id: "geomark_logs", title: 'Geomark Logs'},
  {id: "a_logs", title: 'A Logs'},
  {id: "b_logs", title: 'B Logs'},
  {id: "c_logs", title: 'C Logs'},
  {id: "d_logs", title: 'D Logs'},
  {id: "e_logs", title: 'E Logs'},
  {id: "f_logs", title: 'F Logs'},
  {id: "g_logs", title: 'G Logs'},
  {id: "h_logs", title: 'H Logs'},
  {id: "i_logs", title: 'I Logs'},
  {id: "j_logs", title: 'J Logs'},
  {id: "k_logs", title: 'K Logs'},
  {id: "l_logs", title: 'L Logs'},
  {id: "m_logs", title: 'M Logs'}
    ];
    return {endPoints};
  }
}
