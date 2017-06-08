/*
 * Copyright 2004-2005 Revolution Systems Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ca.bc.gov.gwa.servlet;

import java.net.URL;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.log4j.xml.DOMConfigurator;

@WebListener
public class Log4jServletContextListener implements ServletContextListener {

  @Override
  public void contextDestroyed(final ServletContextEvent event) {
  }

  @Override
  public void contextInitialized(final ServletContextEvent event) {
    final ServletContext context = event.getServletContext();
    final String log4jXml = "/WEB-INF/log4j.xml";
    try {
      final URL log4JConfig = context.getResource(log4jXml);
      if (log4JConfig != null) {
        DOMConfigurator.configure(log4JConfig);
      }
    } catch (final Throwable e) {
      e.printStackTrace();
    }
  }

}
