
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  // Property to store user details
  user: any;
  showSpinner = false;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
this.showSpinner=true;
    setTimeout(() => {
      this.route.params.subscribe(params => {

        const userId = +params['id'];

        // Call the UserService to fetch user details based on the user ID
        this.userService.getUserDetails(userId).subscribe(
          (response: any) => {
            this.user = response.data;
            console.log(this.user);
          },

          (error) => {
            console.error('Error fetching user details:', error);
          },
          () => {
            console.log('User details fetched successfully.');
          }
        );
      });
      this.showSpinner = false;
    }, 3000);
    // Subscribe to route parameters to get the user ID

  }

  // Function to navigate back to the users list
  navigateBack() {
    this.router.navigate(['/users']);
  }
}
