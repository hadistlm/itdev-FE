import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Messaging from "../../Pages/Messaging/Messaging";
import Statistics from "../../Pages/Statistics/Statistics";
import Form from "../../Pages/Form/Form";

const Dashboard = React.lazy(() => import('../../Pages/Dashboard/Dashboard'));
const Testing = React.lazy(() => import('../../Pages/Testing'));

const Broadcast = React.lazy(() => import('../../Pages/Whatsapp/Broadcast'));
const BroadcastForm = React.lazy(() => import('../../Pages/Whatsapp/BroadcastForm'));
const Scheduler = React.lazy(() => import('../../Pages/Whatsapp/Scheduler'));
const SchedulerForm = React.lazy(() => import('../../Pages/Whatsapp/SchedulerForm'));
const Usages = React.lazy(() => import('../../Pages/Whatsapp/Usages'));

const ContactGroup = React.lazy(() => import('../../Pages/Contact_group/GroupList'));
const ContactGroupForm = React.lazy(() => import('../../Pages/Contact_group/GroupForm'));

const Variable = React.lazy(() => import('../../Pages/Setting/Variable'));

const Main = () => {
  return (
  	<React.Suspense fallback={<h1>Still Loading…</h1>}>
	    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
	      <Route exact path='/' component={Dashboard}></Route>
	      <Route exact path='/testing' component={Testing}></Route>
	    	{/*Whatsapp Page*/}
	      <Route exact path='/whatsapp/broadcast' component={Broadcast}></Route>
	      <Route exact path='/whatsapp/broadcast/form' component={BroadcastForm}></Route>
	      <Route exact path='/whatsapp/scheduler' component={Scheduler}></Route>
	      <Route exact path='/whatsapp/scheduler/form' component={SchedulerForm}></Route>
	      <Route exact path='/whatsapp/usages' component={Usages}></Route>
	  		{/*Setting Section*/}
	  		<Route exact path='/setting/contact/group/list' component={ContactGroup}></Route>
	  		<Route exact path='/setting/contact/group/form' component={ContactGroupForm}></Route>
	      <Route exact path='/setting/variable' component={Variable}></Route>


	      <Route exact key="page_statistics" path='/oca/statistics' component={Statistics}/>
	      <Route exact key="page_sms" path='/oca/sms' component={Messaging}/>
	      <Route exact key="page_email" path='/oca/email' component={Messaging}/>
	      <Route exact key="page_whatsapp" path='/oca/whatsapp' component={Messaging}/>
	      <Route exact key="page_form_sms" path='/oca/sms/form' component={Form}/>
	      <Route exact key="page_form_email" path='/oca/email/form' component={Form}/>
	      <Route exact key="page_form_whatsapp" path='/oca/whatsapp/form' component={Form}/>
	    </Switch>
    </React.Suspense>
  );
}

export default Main;