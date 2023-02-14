import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('popup',{static:false}).popup:any;

  public roomId: any;
  public messageText: string | undefined;
  public messageArray: {user: string,message:string}[]=[];
  
  public phone: string | undefined;
  public currentUser: any;
  public selecteduser: any;
  public showScreen: boolean | undefined;
  public storageArray=[];

  public userList=[
    {
      id:1,
      name:'The swag coder',
      phone:'8247033653',
      image:'#',
      roomId:{
        2:'room-1',
        3:'room-2',
        4:'room-3'
        }
    },
    {
      id:2,
      name:'Wade Warren',
      phone:'8247033654',
      image:'#',
      roomId:{
        1:'room-1',
        3:'room-4',
        4:'room-5'
        }
    },
    {
      id:3,
      name:'Albert Flores',
      phone:'8247033655',
      image:'#',
      roomId:{
        1:'room-2',
        2:'room-4',
        4:'room-6'
        }
    },
    {
      id:4,
      name:'Dianne',
      phone:'8247033656',
      image:'#',
      roomId:{
        1:'room-3',
        2:'room-5',
        3:'room-6'
        }
    }
  ];
  constructor(
    private modalService:NgModel,
    private chatService: ChatService){
    
  }

  ngOnInit(): void {
    this.chatService.getMessage()
    .subscribe((data:{user:string,message:string})=>{
      //this,this.messageArray.push(data);
      if (this.roomId){
        this.storageArray=this.chatService.getStorage();
        const storeIndex = this.storageArray.findIndex((storage)=>storage.roomId === this.roomId)
        this.messageArray = this.storageArray[storeIndex].chats;
      }
    });
  }


  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }
  openPopup(content:any):void{
    this.modalService.open(content, {backdrop:'static',centered:true});
  }

  login(dismiss:any):void{
    this.currentUser=this.userList.find(user=>user.phone===this.phone?.toLowerCase());
    this.userList=this.userList.filter((user)=>user.phone !==this.phone?.toLowerCase())

    if (this.currentUser){
      this.showScreen = true;
      dismiss();
    }
  }


  

    selectUserHandler(phone:string):void{
    this.selecteduser=this.userList.find(user=>user.phone===this.phone);
    this.roomId=this.selecteduser.roomId[this.selecteduser.id];
    this.messageArray=[];
    this.storageArray=this.chatService.getStorage();
    const storageIndex = this.storageArray.findIndex((storage)=>storage.roomId=== this.roomId);
    if (storageIndex >-1){
      this.messageArray=this.storageArray[storageIndex.chats;]
    }

    this.join(this.currentUser.name,this.roomId);
    }
  join(username:string,roomId:string):void{
    this.chatService.joinRoom({user:username, roomId:roomId});
  }
  sendMessage():void{
    this.chatService.sendMessage({
      data:this.currentUser.name,
      room:this.roomId,
      message:this.messageText
    });
    this.messageText='';
  }

}
