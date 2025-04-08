import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  submitted = false;


  async ngOnInit() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = await this.housingService.getHousingLocationById(housingLocationId);
  }

  // constructor() {
  //   const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
  //   this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
  //     this.housingLocation = housingLocation;
  //   });
  // }



  submitApplication(){
    this.submitted = true;
    if (this.applyForm.invalid) {
      return;
    }

    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );

    this.applyForm.reset();
    this.submitted = false; // limpa flag se tudo deu certo
    alert('Application submitted!');
  }
}
