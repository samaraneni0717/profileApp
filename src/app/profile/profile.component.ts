import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { APIService } from '../API.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
userId:string='';
userName:string='';
userInterests=''
  constructor(private api: APIService) { }

  ngOnInit(): void {
    Auth.currentAuthenticatedUser({
      bypassCache:false
    }).then(async user =>{
      this.userId=user.attributes.sub;
      this.userName=user.username;
    })
    .catch(err => console.log(err))
  }

  async updateUserInfo(){
const user={
  id:this.userId,
  username: this.userName,
  bio: this.userInterests
}
await this.api.CreateUser(user)
  }

}
