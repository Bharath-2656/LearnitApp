import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule,HttpInterceptor} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserService } from './shared/services/User/user.service';
import { AuthGuard } from './shared/Auth/auth.guard';
import { AuthInterceptor } from './shared/Auth/auth.interceptor';
import { UserRoutesModule } from './core/user-routes/user-routes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './core/user-routes/footer/footer.component';
import { CommonModule } from '@angular/common';
import { InstructorModule } from './core/instructor/instructor.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    UserRoutesModule,
    BrowserAnimationsModule,
    InstructorModule,
  ],
  providers: [UserService,AuthGuard,AuthInterceptor ],
  bootstrap: [AppComponent]
})
export class AppModule { }
